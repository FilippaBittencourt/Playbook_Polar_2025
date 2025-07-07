import { Search } from "lucide-react";
import { useConteudo } from '@/context/ConteudoContext';

interface SearchResultsProps {
  query: string;
  setQuery: (value: string) => void;
  handleTopicSelect: (topic: string) => void;
}

const SearchResults = ({ query, setQuery, handleTopicSelect }: SearchResultsProps) => {
  const { conteudo } = useConteudo();

  const searchResults = Object.entries(conteudo)
    .filter(([chave, markdown]) => {
      const termo = query.toLowerCase();
      return (
        chave.toLowerCase().includes(termo) ||
        markdown.toLowerCase().includes(termo)
      );
    })
    .map(([chave, markdown]) => ({
      title: chave,
      content: markdown
    }));

  const handleResultClick = (title: string) => {
    setQuery('');
    handleTopicSelect(title);
    window.location.hash = '';
  };

  return (
    <article className="bg-white">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Resultados da pesquisa: "{query}"
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>{searchResults.length} resultado(s) encontrado(s)</span>
        </div>
      </header>

      <div className="space-y-6">
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-500">
              Tente usar palavras-chave diferentes ou verifique a ortografia.
            </p>
          </div>
        ) : (
          searchResults.map((result, index) => (
            <button
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full text-left"
              onClick={() => handleResultClick(result.title)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  {result.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {result.content.substring(0, 200)}...
              </p>
            </button>
          ))
        )}
      </div>
    </article>
  );
};

export default SearchResults;
