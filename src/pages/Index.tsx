import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";
import { useConteudo } from "@/context/ConteudoContext";

const Index = () => {
  // ✅ começa FECHADO
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [query, setQuery] = useState("");

  const { conteudo, carregarMenu } = useConteudo();
  const location = useLocation();

  // Inicializa o selectedTopic com a key "home" quando o conteúdo estiver carregado
  useEffect(() => {
    const menu = carregarMenu();
    const homeItem = menu.find((item) => item.key === "home");
    if (homeItem) {
      setSelectedTopic(homeItem.key);
    }
  }, [conteudo, carregarMenu]);

  // ✅ garante que o menu esteja fechado no primeiro render
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  // ✅ fecha o menu a cada mudança de rota (ex.: após login/redirecionamento)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleTopicSelect = (topicKey: string) => {
    setSelectedTopic(topicKey);
    if (window.location.hash.startsWith("#search")) {
      window.location.hash = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isMenuOpen={sidebarOpen}
        onMenuToggle={() => setSidebarOpen((open) => !open)}
        query={query}
        setQuery={setQuery}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          handleTopicSelect={handleTopicSelect}
          onClose={() => setSidebarOpen(false)}
        />

        <MainContent
          selectedTopic={selectedTopic}
          sidebarOpen={sidebarOpen}
          handleTopicSelect={handleTopicSelect}
          setQuery={setQuery}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
