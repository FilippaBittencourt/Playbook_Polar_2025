// src/components/ProtectedRedirect.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Substitua pela URL real do backend em produção (com HTTPS)
const API_URL = 'https://backend-playbook-production.up.railway.app';

const ProtectedRedirect = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const res = await fetch(`${API_URL}/verificar-autenticacao`, {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.autenticado) {
          navigate('/home', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        navigate('/login', { replace: true });
      } finally {
        setCarregando(false);
      }
    };

    verificarAutenticacao();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Verificando autenticação...</p>
      </div>
    </div>
  );
};

export default ProtectedRedirect;
