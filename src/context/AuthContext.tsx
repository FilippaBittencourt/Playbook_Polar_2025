import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<string | null>(null);

  const verificarLogin = async () => {
    const resp = await fetch('/api/verificar-autenticacao', {
        credentials: 'include'
    });

    const dados = await resp.json();
    if (dados.autenticado) {
      setUsuario(dados.usuario);
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

export const useAuth = () => useContext(AuthContext);
