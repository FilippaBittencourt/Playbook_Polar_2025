import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRedirect = () => {
  const navigate = useNavigate();
  const { isLogged, isAdmin } = useAuth();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (isLogged) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
    setCarregando(false);
  }, [isLogged, isAdmin, navigate]);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ProtectedRedirect;
