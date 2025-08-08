import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_BASE = 'https://backend-playbook-production.up.railway.app';

type AuthContextType = {
  usuario: string | null;
  setUsuario: (usuario: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<string | null>(null);

  const verificarLogin = async () => {
    try {
      const resp = await fetch(`${API_BASE}/verificar-autenticacao`, {
        credentials: 'include',
      });

      const dados = await resp.json();

      if (dados.autenticado) {
        setUsuario(dados.usuario);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
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
