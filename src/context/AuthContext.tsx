import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
  usuario: string | null; // 'admin', 'user' ou null
  setUsuario: (usuario: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CHAVE_USER = '57jFx><36#8I';
const CHAVE_ADMIN = 'z2d|MO7.QW2]';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<string | null>(null);

  const verificarLogin = () => {
    const valorCookie = getCookie('chaveSecreta');

    if (valorCookie === CHAVE_ADMIN) {
      setUsuario('admin');
    } else if (valorCookie === CHAVE_USER) {
      setUsuario('user');
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    verificarLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
