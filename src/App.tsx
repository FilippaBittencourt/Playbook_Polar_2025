// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRedirect from "./components/ProtectedRedirect";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import { AdminHeader } from "@/components/AdminHeader"; // ← certifique-se de criar este componente em src/components/AdminHeader.tsx

import { ConteudoProvider } from "./context/ConteudoContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ConteudoProvider>
        <BrowserRouter>
          <Routes>
            {/* rotas públicas */}
            <Route path="/login" element={<Login />} />

            {/* rota principal pós‑login */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />

            {/* painel admin */}
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <>
                    <AdminHeader />  {/* botão “Sair” */}
                    <Admin />
                  </>
                </PrivateRoute>
              }
            />

            {/* raiz e 404 */}
            <Route path="/" element={<ProtectedRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ConteudoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
