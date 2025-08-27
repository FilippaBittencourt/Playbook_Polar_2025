// src/components/AdminHeader.tsx
import React, { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/authService";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderButton {
  label?: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

interface AdminHeaderProps {
  title?: string;
  buttons?: HeaderButton[];
}

export function AdminHeader({ title = "Painel Admin", buttons = [] }: AdminHeaderProps) {
  const navigate = useNavigate();
  const { setUsuario } = useAuth();

  const handleLogout = () => {
    logoutUser();
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {/* Botões dinâmicos */}
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`p-2 rounded hover:bg-gray-100 transition ${btn.className || ""}`}
            aria-label={btn.label}
          >
            {btn.icon ? btn.icon : btn.label}
          </button>
        ))}

        {/* Botão padrão de logout */}
        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          <LogOut className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
    </header>
  );
}
