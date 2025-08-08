import { Menu, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
  query: string;
  setQuery: (value: string) => void;
}

const Header = ({ onMenuToggle, query, setQuery }: HeaderProps) => {
  const handleSearch = () => {
    if (query.trim()) {
      window.location.hash = `#search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleLogout = () => {
    // Remove o cookie 'chaveSecreta' definindo expiração no passado
    document.cookie = 'chaveSecreta=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  
    // Opcional: atualizar o estado ou redirecionar para login
    window.location.href = '/login'; // redireciona para login após logout
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-blue-600 flex items-center px-4 shadow-lg">
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex gap-2 items-center">
          <button
            onClick={onMenuToggle}
            className="text-white hover:bg-blue-600 p-2 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="text-white text-xl font-bold">Playbook Polar</a>
        </div>

        <div className="flex-1 max-w-md mx-8 relative">
          <form className="relative">
            <button
              type="button"
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Search size={20} />
            </button>
            <Input
              type="text"
              placeholder="Pesquisar artigos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </form>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src="logopolar.png"
            alt="Polar Comercial"
            className="h-8 w-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-white hover:bg-blue-700"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;