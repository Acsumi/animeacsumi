import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "Http://localhost:4000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userId", data.userId);
      console.log("Login successful:", data);
      navigate("/DashBoard");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Error al iniciar sesión");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-600 to-purple-700 py-12">
      <div className="w-full max-w-xl bg-white/90 p-12 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Bienvenido a <span className="text-purple-600">Anime Acmisu</span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 flex flex-col items-center"
        >
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
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
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
              className="mt-3 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="text-red-500 text-center text-md">{errorMessage}</div>
          )}

          {/* Botón para iniciar sesión */}
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 px-8 text-xl font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Link para recuperar contraseña */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-md font-medium text-purple-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Registro */}
        <div className="mt-6 text-center">
          <span className="text-md text-gray-600">
            ¿No tienes una cuenta?
          </span>{" "}
          <a
            href="/Register"
            className="text-md font-medium text-purple-600 hover:underline"
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
