// src/components/PrivateRoute.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // use se estiver usando AuthContext

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const API_URL = 'https://backend-playbook-production.up.railway.app';

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setUsuario } = useAuth(); // opcional: usar contexto para guardar o usuário

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/verificar-autenticacao`, {
          credentials: 'include',
        });

        const data = await res.json();
        console.log("Route")
        console.log(data)

        if (data.autenticado) {
          setUsuario(data.usuario); // armazenar no contexto se quiser

          if (adminOnly && data.usuario !== 'admin') {
            navigate('/home', { replace: true });
          } else {
            setLoading(false);
          }
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        navigate('/login', { replace: true });
      }
    };

    verify();
  }, [navigate, adminOnly, setUsuario]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
