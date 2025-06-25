// src/pages/Logout.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fazerLogout = async () => {
      try {
        await fetch("/api/logout", {
          method: "GET",
          credentials: "include",
        });

        // Aguarda brevemente antes de redirecionar
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      } catch (err) {
        console.error("Erro ao deslogar:", err);
        navigate("/login", { replace: true });
      } finally {
        setCarregando(false);
      }
    };

    fazerLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Encerrando sessão...</p>
      </div>
    </div>
  );
};

export default Logout;
