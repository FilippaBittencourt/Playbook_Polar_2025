// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState<boolean | null>(null);

  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await fetch('/api/verificar-autenticacao', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.autenticado) {
          setAutenticado(true);
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        navigate('/login', { replace: true });
      } finally {
        setCarregando(false);
      }
    };

    verificar();
  }, [navigate]);

  if (carregando || autenticado === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
