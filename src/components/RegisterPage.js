import React, { useState } from "react";

const RegisterPage = () => {
  // Estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Realiza la solicitud Post
      const response = await fetch(
        "https://backacsumi.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Usuario registrado exitosamente.");
      } else {
        setMessage(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrió un error al registrar el usuario");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-12">
      <div className="w-full max-w-2xl bg-white/90 p-16 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          ¡Únete a <span className="text-pink-500">Anime Acmisu</span>!
        </h2>
        <p className="text-center text-gray-700 mb-6 text-lg">
          Regístrate y comienza tu aventura.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 flex flex-col items-center"
        >
          {/* Campo de nombre de usuario */}
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-800"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          {/* Campo de correo electrónico */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-800"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-800"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Campo de confirmación de contraseña */}
          <div className="w-full">
            <label
              htmlFor="confirm-password"
              className="block text-lg font-medium text-gray-800"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {/* Botón de registro */}
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-4 px-8 text-xl rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-all duration-300 ease-in-out"
            >
              Crear Cuenta
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-6 text-center text-red-600 font-medium text-lg">
            {message}
          </div>
        )}

        {/* Link para iniciar sesión */}
        <div className="mt-8 text-center">
          <span className="text-md text-gray-600">¿Ya tienes una cuenta?</span>{" "}
          <a
            href="login"
            className="text-md font-medium text-pink-500 hover:underline"
          >
            Inicia Sesión aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
