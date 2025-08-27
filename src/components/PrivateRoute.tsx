// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const CHAVE_USER = '57jFx><36#8I';
const CHAVE_ADMIN = 'z2d|MO7.QW2]';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const valorCookie = getCookie('chaveSecreta');

  const isAuthenticated = valorCookie === CHAVE_USER || valorCookie === CHAVE_ADMIN;
  const isAdmin = valorCookie === CHAVE_ADMIN;

  if (!isAuthenticated) {
    // Usuário não autenticado: redireciona para login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Usuário não é admin e rota é adminOnly: redireciona para home ou login
    return <Navigate to="/home" replace />;
  }

  // Se chegou aqui, tem acesso liberado
  return <>{children}</>;
};

export default PrivateRoute;
