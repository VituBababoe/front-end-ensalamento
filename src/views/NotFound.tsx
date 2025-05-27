import React, { useEffect } from 'react';

const NotFound: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/'; // Redireciona para a página inicial
    }, 5000); // 5 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-700">Página Não Encontrada</p>
        <p className="mt-2 text-sm text-gray-500">
          Você será redirecionado para a página inicial em 5 segundos.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
