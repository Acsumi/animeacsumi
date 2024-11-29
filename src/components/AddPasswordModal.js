import React from "react";

const AddPasswordModal = ({
  showModal,
  setShowModal,
  newPassword,
  handleChange,
  handleAddPassword,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h3 className="text-4xl font-bold text-center text-white mb-8">
          Califica tu anime
        </h3>
        <div className="space-y-6">
          {/* Input: Nombre */}
          <div>
            <label
              className="block text-lg font-medium text-white mb-3"
              htmlFor="nombre"
            >
              Titulo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={newPassword.nombre}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Input: Tipo de Elemento */}
          <div>
            <label
              className="block text-lg font-medium text-white mb-3"
              htmlFor="tipo_elemento"
            >
          Genero
            </label>
            <input
              type="text"
              name="tipo_elemento"
              id="tipo_elemento"
              placeholder="Tipo de Elemento"
              value={newPassword.tipo_elemento}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Input: URL */}
          <div>
            <label
              className="block text-lg font-medium text-white mb-3"
              htmlFor="url"
            >
              Aplicacion
            </label>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="URL"
              value={newPassword.url}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Input: Contraseña */}
          <div>
            <label
              className="block text-lg font-medium text-white mb-3"
              htmlFor="password"
            >
              Calificacion
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={newPassword.password}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center mt-8 space-x-6">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddPassword}
            className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-600 hover:to-indigo-700 transition-all"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordModal;
