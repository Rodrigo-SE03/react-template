import React from "react";
import { Link } from "react-router-dom";

const ServerError: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="text-xl mt-4 text-gray-700">Erro interno do servidor</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default ServerError;