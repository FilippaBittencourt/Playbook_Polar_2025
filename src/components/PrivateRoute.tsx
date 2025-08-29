import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; // se true, apenas admins podem acessar
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const { isLogged, isAdmin } = useAuth();

  if (!isLogged) {
    // Usuário não autenticado: redireciona para login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Rota apenas para admins
    return <Navigate to="/home" replace />;
  }

  // Todos os usuários autenticados podem acessar
  return <>{children}</>;
};

export default PrivateRoute;
