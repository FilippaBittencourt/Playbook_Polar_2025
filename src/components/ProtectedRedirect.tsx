// src/components/ProtectedRedirect.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CHAVE_USER = '57jFx><36#8I';
const CHAVE_ADMIN = 'z2d|MO7.QW2]';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

const ProtectedRedirect = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = () => {
      const valorCookie = getCookie('chaveSecreta');

      if (valorCookie === CHAVE_ADMIN) {
        navigate('/admin', { replace: true });
      } else if (valorCookie === CHAVE_USER) {
        navigate('/home', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
      setCarregando(false);
    };

    verificarAutenticacao();
  }, [navigate]);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ProtectedRedirect;
