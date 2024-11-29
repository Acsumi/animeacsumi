import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconEye, IconEyeOff, IconCopy, IconCheck, IconEdit, IconPlus, IconTrash} from "@tabler/icons-react";
import AddPasswordModal from "./AddPasswordModal";
import { data } from "autoprefixer";

const PasswordTable = () => {
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedPasswordId, setCopiedPasswordId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [newPassword, setNewPassword] = useState({
    nombre: "",
    tipo_elemento: "",
    url: "",
    password: "",
  });
  const [isSubscribed, setIsSubscribed] = useState(false);


  // Obtener contraseñas de la API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("https://backacsumi.onrender.com/get_passwords", {
        headers: { userId },
      })
      .then((response) => setPasswords(response.data))
      .catch((error) => console.error("Error al obtener anime", error));

    // Verificar suscripción y suscribirse si no está suscrito
    if (!localStorage.getItem('isSubscribed')) {
      subscribeToNotifications();
      localStorage.setItem('isSubscribed', 'true'); // Marca que la suscripción fue hecha
    }
  }, []);
  

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const copyToClipboard = (password, id) => {
    navigator.clipboard.writeText(password).then(() => {
      setCopiedPasswordId(id);
      setTimeout(() => setCopiedPasswordId(null), 2000);
    });
  };

  // Maneja el cambio en el formulario del modal
  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleAddPassword = async () => {
    const userId = localStorage.getItem("userId"); 
  
    if (!userId) {
      console.error("Error: No se ha encontrado el ID de usuario."); 
      return;
    }
  
    const passwordToSend = {
      nombre: newPassword.nombre, 
      tipo_elemento: newPassword.tipo_elemento,
      url: newPassword.url, 
      password: newPassword.password,
      userId: userId,
    }; 
  
    console.log("Enviando datos al servidor:", passwordToSend);
  
    try {
      // Enviar nueva contraseña al servidor
      const response = await fetch('https://backacsumi.onrender.com/post_passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(passwordToSend)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la API: ${errorData.message}`);
      }
  
      const data = await response.json();
  
      // Actualiza la lista de contraseñas con la nueva
      setPasswords([...passwords, data]); 
      setShowModal(false); // Cierra el modal
      setNewPassword({ nombre: '', tipo_elemento: '', url: '', password: '' }); // Reinicia el formulario
  
      // Enviar notificación push
      await fetch('https://backacsumi.onrender.com/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          message: `Se ha guardado el anime para ${newPassword.nombre}.`,
        }),
      });
  
      console.log("Notificación push enviada correctamente");
    } catch (error) {
      console.error('Error en la petición, guardando localmente:', error);
  
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
          const sw = await navigator.serviceWorker.ready;
          await sw.sync.register('sync-passwords'); 
          console.log('Sincronización registrada');
        } catch (err) {
          console.error('Error al registrar la sincronización:', err);
        }
      }
  
      try {
        await savePasswordToIndexedDB(passwordToSend);
        console.log('Tarea guardada en IndexedDB debido a la falla en la red');
      } catch (err) {
        console.error('Error al guardar en IndexedDB:', err);
      }
    }
  };
  

  const savePasswordToIndexedDB = (password) => {
    return new Promise((resolve, reject) => {
      console.log("Intentando guardar en IndexedDB...");
      const dbRequest = indexedDB.open("passwordDB", 1);
  
      dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log("Creando almacén de objetos...");
        if (!db.objectStoreNames.contains("passwords")) {
          db.createObjectStore("passwords", { keyPath: "id", autoIncrement: true });
        }
      };
  
      dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("passwords", "readwrite");
        const objectStore = transaction.objectStore("passwords");
  
        const addRequest = objectStore.add(password);
        addRequest.onsuccess = () => {
          console.log("anime guardada en IndexedDB");
          resolve();
        };
        addRequest.onerror = (error) => {
          console.error("Error al agregar a IndexedDB:", error);
          reject("Error al guardar en IndexedDB");
        };
      };
  
      dbRequest.onerror = (error) => {
        console.error("Error al abrir IndexedDB:", error);
        reject("Error al abrir IndexedDB");
      };
    });
  };

  

    // Delete password from the database
    const deletePassword = (id) => {
      const userId = localStorage.getItem("userId"); // Obtén el userId de localStorage
    
      axios.delete(`https://backacsumi.onrender.com/delete/${id}`, {
        headers: { userId } // Envía el userId en el encabezado
      })
        .then(() => {
          setPasswords(passwords.filter((password) => password._id !== id)); // Actualiza el estado local
        })
        .catch((error) => {
          console.error("Error deleting password:", error);
        });
    };

    async function subscribeToNotifications() {
      const userId = localStorage.getItem("userId");
    
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
    
          // Verificar si ya existe una suscripción
          const existingSubscription = await registration.pushManager.getSubscription();
          if (existingSubscription) {
            console.log("El usuario ya está suscrito");
            return;
          }
    
          // Solicitar permiso para notificaciones
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const newSubscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: "BIYXKdnfxafNUIOFKQJ2c15V3So6sI7NKvE0n2-QybhqmM6aaT_v5LM5A0KEhXd7yPecfxD69jso3KhOSN3wpJ4"
            });
    
            // Formatear los datos de suscripción junto con userId
            const subscriptionData = {
              ...newSubscription.toJSON(),
              userId 
            };
    
            // Enviar la suscripción a la API
            const response = await fetch('https://backacsumi.onrender.com/suscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(subscriptionData)
            });
    
            if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.statusText);
            }
    
            const data = await response.json();
            console.log('Suscripción guardada en la BD', data);
          } else {
            console.log("Permiso para notificaciones denegado");
          }
        } catch (error) {
          console.error('Error en el proceso de suscripción', error);
        }
      } else {
        console.log("El navegador no soporta Service Worker o Push Notifications");
      }
    }
    

return (
  <div className="container mx-auto px-6 py-8">
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      <h2 className="text-3xl font-bold text-gray-800">Animes Calificados</h2>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-custom-204E51-light flex items-center space-x-2 w-full md:w-auto"
      >
        <IconPlus size={20} />
        <span>Agregar Anime</span>
      </button>
    </div>

    {/* Tabla de contraseñas */}
<div className="overflow-x-auto">
  <table className="min-w-full table-auto bg-white shadow-lg rounded-lg border border-gray-300">
    <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <tr>
        <th className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider">Título</th>
        <th className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider hidden md:table-cell">Género</th>
        <th className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider hidden lg:table-cell">Aplicación</th>
        <th className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider">Calificación</th>
      </tr>
    </thead>
    <tbody>
      {passwords.map((password, index) => (
        <tr
          key={password._id}
          className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition duration-300`}
        >
          <td className="py-4 px-6 text-gray-800 font-medium">{password.nombre}</td>
          <td className="py-4 px-6 text-gray-600 hidden md:table-cell">{password.tipo_elemento}</td>
          <td className="py-4 px-6 text-blue-600 underline hidden lg:table-cell">
            <a href={password.url} target="_blank" rel="noopener noreferrer">
              {password.url}
            </a>
          </td>
          <td className="py-4 px-6 text-gray-800">{password.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>





      {/* Importa y usa el modal */}
      <AddPasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPassword={newPassword}
        handleChange={handleChange}
        handleAddPassword={handleAddPassword}
      />
    </div>
  );
};

export default PasswordTable;
