// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRedirect from "./components/ProtectedRedirect";
import Admin from "./pages/Admin";
import { ConteudoProvider } from './context/ConteudoContext'; // ✅ Importação do provider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ConteudoProvider> {/* ✅ Agora todas as rotas têm acesso ao conteúdo */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />

            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<ProtectedRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ConteudoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
