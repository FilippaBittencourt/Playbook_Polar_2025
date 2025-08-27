import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { validarLogin, logoutUser } from "@/services/authService";

type AuthContextType = {
  usuario: "admin" | "user" | null;
  setUsuario: (usuario: "admin" | "user" | null) => void;
  isAdmin: boolean;
  isLogged: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<"admin" | "user" | null>(null);

  // Atualiza estado baseado no cookie
  const verificarLogin = () => {
    const resultado = validarLogin();
    if (resultado.isLogged) {
      setUsuario(resultado.isAdmin ? "admin" : "user");
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    verificarLogin();
  }, []);

  const logout = () => {
    logoutUser();
    setUsuario(null);
  };

  const isAdmin = usuario === "admin";
  const isLogged = !!usuario;

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, isAdmin, isLogged, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
