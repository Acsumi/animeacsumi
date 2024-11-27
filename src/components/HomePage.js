import React from 'react';
import mushokuImg from '../img/mushoku.jpg';
import caveImg from '../img/cave.jpg';
import coteImg from '../img/cote.jpg';
import gekaiImg from '../img/gekai.jpg';
import kaijuImg from '../img/kaiju.jpg';

const AnimeHomePage = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-800 to-black py-16 text-white relative">
      <div
        id="home-container"
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12"
      >
        {/* Texto principal */}
        <div className="lg:w-1/2 text-center lg:text-left lg:pr-12">
          <h1 className="text-5xl lg:text-6xl font-extrabold italic mb-8 text-yellow-300 drop-shadow-lg">
            ¡Explora Mundos Increíbles!
          </h1>
          <p className="text-lg lg:text-xl mb-6 block font-medium drop-shadow-sm">
            Sumérgete en universos llenos de magia, acción y aventura. Desde{" "}
            <span className="text-pink-300">reencarnaciones épicas</span> hasta{" "}
            <span className="text-green-300">conflictos escolares</span>, ¡aquí encontrarás
            historias que cambiarán tu mundo!
          </p>
          <button className="bg-yellow-300 text-black px-6 py-3 rounded-full hover:bg-yellow-400 hover:scale-105 transform transition duration-300 ease-in-out font-bold shadow-lg">
            Ver Ahora
          </button>
        </div>

        {/* Imagen principal */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center relative">
          <img
            src={mushokuImg}
            alt="Mushoku Tensei"
            className="rounded-2xl w-full lg:w-4/5 shadow-2xl border-4 border-pink-500"
          />
          <h2 className="absolute bottom-4 left-4 text-3xl font-bold italic text-pink-500 drop-shadow-md">
            Mushoku Tensei: Reencarnación sin arrepentimientos
          </h2>
        </div>
      </div>

      {/* Galería de Animes Destacados */}
      <div className="mt-12 container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <img
            src={caveImg}
            alt="Aventuras en cuevas"
            className="rounded-2xl shadow-lg transition-transform transform group-hover:scale-105"
          />
          <h3 className="absolute bottom-2 left-2 text-lg font-bold text-yellow-300 bg-black bg-opacity-50 px-2 py-1 rounded-md">
            Aventuras en las Cuevas
          </h3>
        </div>
        <div className="relative group">
          <img
            src={coteImg}
            alt="Conflictos Escolares"
            className="rounded-2xl shadow-lg transition-transform transform group-hover:scale-105"
          />
          <h3 className="absolute bottom-2 left-2 text-lg font-bold text-yellow-300 bg-black bg-opacity-50 px-2 py-1 rounded-md">
            Conflict of Elites
          </h3>
        </div>
        <div className="relative group">
          <img
            src={gekaiImg}
            alt="Dungeons y Aventuras"
            className="rounded-2xl shadow-lg transition-transform transform group-hover:scale-105"
          />
          <h3 className="absolute bottom-2 left-2 text-lg font-bold text-yellow-300 bg-black bg-opacity-50 px-2 py-1 rounded-md">
            Aventuras en Gekai
          </h3>
        </div>
        <div className="relative group">
          <img
            src={kaijuImg}
            alt="Kaiju Battles"
            className="rounded-2xl shadow-lg transition-transform transform group-hover:scale-105"
          />
          <h3 className="absolute bottom-2 left-2 text-lg font-bold text-yellow-300 bg-black bg-opacity-50 px-2 py-1 rounded-md">
            Batallas de Kaiju
          </h3>
        </div>
      </div>

      {/* Decoración adicional estilo anime */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-300 h-24 w-24 rounded-full absolute top-10 left-10 blur-xl opacity-70"></div>
        <div className="animate-bounce bg-blue-500 h-16 w-16 rounded-full absolute bottom-20 right-10 blur-xl opacity-50"></div>
      </div>
    </section>
  );
};

export default AnimeHomePage;
