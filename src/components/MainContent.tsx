import { useEffect, useState } from "react";
import ArticleContent from "./ArticleContent";
import SearchResults from "./SearchResults";

interface MainContentProps {
  selectedTopic: string;
  sidebarOpen: boolean;
  handleTopicSelect: (topic: string) => void;
  setQuery: (value: string) => void; // para atualizar o input de busca
}

const MainContent = ({
  selectedTopic,
  sidebarOpen,
  handleTopicSelect,
  setQuery,
}: MainContentProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Função para extrair o query do hash
  const parseQueryFromHash = () => {
    const hash = window.location.hash; // ex: "#search?q=algo"
    if (hash.startsWith("#search")) {
      const params = new URLSearchParams(hash.slice(hash.indexOf("?")));
      return params.get("q") || "";
    }
    return null;
  };

  // Atualiza o estado sempre que o hash mudar
  useEffect(() => {
    const onHashChange = () => {
      const q = parseQueryFromHash();
      setSearchQuery(q);
      setQuery(q || ""); // atualiza o campo de busca
    };

    onHashChange(); // roda no load para pegar o hash atual
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [setQuery]);

  return (
    <main
      className={`flex-1 pt-16 pb-8 transition-all duration-300 ${
        sidebarOpen ? "ml-80" : "ml-0"
      }`}
    >
      <div className="container mx-auto px-8 py-8 max-w-4xl">
        {searchQuery ? (
          <SearchResults
            query={searchQuery}
            setQuery={setQuery}
            handleTopicSelect={handleTopicSelect}
          />
        ) : (
          <ArticleContent topic={selectedTopic} />
        )}
      </div>
    </main>
  );
};

export default MainContent;