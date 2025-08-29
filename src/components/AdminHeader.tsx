// src/components/AdminHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
        document.cookie = 'chaveSecreta=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Painel Admin</h1>
      <button
        onClick={handleLogout}
        aria-label="Sair"
        className="p-2 rounded hover:bg-gray-100 transition"
      >
        <LogOut className="w-6 h-6 text-gray-600 hover:text-gray-800" />
      </button>
    </header>
  );
}
