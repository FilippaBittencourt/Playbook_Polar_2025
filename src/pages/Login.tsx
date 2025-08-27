import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificando, setVerificando] = useState(true);

  const navigate = useNavigate();
  const { setUsuario, isLogged, isAdmin } = useAuth();

  // Verifica se já existe login válido no cookie
  useEffect(() => {
    if (isLogged) {
      navigate(isAdmin ? "/admin" : "/home");
    }
    setVerificando(false);
  }, [isLogged, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginUser(username, password);

      if (result.success && result.user) {
        // Atualiza o contexto
        setUsuario(username === "admin" ? "admin" : "user");

        // Redireciona automaticamente conforme tipo
        navigate(username === "admin" ? "/admin" : "/home");
      } else {
        setError(result.message || "Usuário ou senha inválidos.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro inesperado no login.");
    } finally {
      setIsLoading(false);
    }
  };

  if (verificando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 mt-6">
          <div className="inline-block mb-2">
            <img
              src="/logopolar2.png"
              alt="Logo da Polar Comercial"
              className="h-10 w-auto mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">
            Playbook Comercial
          </h1>
          <p className="text-gray-600">Acesso restrito a colaboradores</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 font-semibold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Digite sua senha"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-base"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Esqueceu a senha? Entre em contato com{" "}
          <a
            href="mailto:filippa.bittencourt@polar.com"
            className="text-blue-600 hover:underline"
          >
            filippa.bittencourt@ambar.tech
          </a>
        </p>

        <div className="text-center mt-8 text-gray-500 text-xs">
          <p>© 2025 Polar Comercial</p>
          <p className="italic">"Construindo o simples"</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
