import { useState, useRef, useEffect } from "react";
import { Menu, Search, LogOut, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
  query: string;
  setQuery: (value: string) => void;
}

const Header = ({ onMenuToggle, query, setQuery }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (query.trim()) {
      window.location.hash = `#search?q=${encodeURIComponent(query.trim())}`;
      setShowSearch(false); // fecha após pesquisar
    }
  };

  const handleLogout = () => {
    document.cookie =
      "chaveSecreta=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  // Fecha a busca ao clicar fora (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-blue-600 flex items-center px-4 shadow-lg">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Esquerda: Menu + Logo */}
        <div className="flex gap-2 items-center">
          <button
            onClick={onMenuToggle}
            className="text-white hover:bg-blue-600 p-2 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="text-white text-xl font-bold">
            Playbook Polar
          </a>
        </div>

        {/* Pesquisa - desktop (sem mudanças) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 mr-5 relative">
          <form className="relative w-full">
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

        {/* Direita: Ícones */}
        <div className="flex items-center space-x-3">
          {/* Ícone de busca só no mobile */}
          <button
            className="md:hidden text-white hover:bg-blue-700 p-2 rounded"
            onClick={() => setShowSearch(true)}
            aria-label="Abrir busca"
          >
            <Search size={22} />
          </button>

          <img
            src="logopolar.png"
            alt="Polar Comercial"
            className="h-8 w-auto hidden md:block"
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

      {/* Overlay de pesquisa no mobile */}
      <div
        className={`absolute inset-0 bg-blue-600 flex items-center px-4 transition-all duration-300 ease-in-out ${
          showSearch ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div ref={searchRef} className="relative w-full">
          <form className="relative w-full">
            <button
              type="button"
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search size={20} />
            </button>
            <Input
              type="text"
              placeholder="Pesquisar..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full pl-10 pr-10 py-2 bg-white border-none rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            {/* Botão X ainda disponível se o user quiser fechar manualmente */}
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Fechar busca"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
