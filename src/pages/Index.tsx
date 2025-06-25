import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("home");
  const [query, setQuery] = useState("");

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    // remove a hash da URL se estiver em modo de busca
    if (window.location.hash.startsWith("#search")) {
      window.location.hash = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        query={query} 
        setQuery={setQuery} 
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          handleTopicSelect={handleTopicSelect}
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
