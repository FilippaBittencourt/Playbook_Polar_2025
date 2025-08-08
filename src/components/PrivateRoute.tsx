import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const CHAVE_USER = '57jFx><36#8I';
const CHAVE_ADMIN = 'z2d|MO7.QW2]';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setUsuario } = useAuth();

  useEffect(() => {
    const verificarAutenticacao = () => {
      const valorCookie = getCookie('chaveSecreta');
  
      if (valorCookie === CHAVE_ADMIN) {
        // admin pode acessar qualquer rota
        setUsuario('admin');
        setLoading(false);
      } else if (valorCookie === CHAVE_USER) {
        if (adminOnly) {
          // usuário normal não pode acessar área admin
          navigate('/home', { replace: true });
        } else {
          setUsuario('user');
          setLoading(false);
        }
      } else {
        navigate('/login', { replace: true });
      }
    };
  
    verificarAutenticacao();
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
