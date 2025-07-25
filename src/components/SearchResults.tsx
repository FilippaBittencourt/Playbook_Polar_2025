// src/components/SearchResults.tsx
import { Search } from "lucide-react";
import { useConteudo } from "@/context/ConteudoContext";

interface SearchResultsProps {
  query: string;
  setQuery: (value: string) => void;
  handleTopicSelect: (topic: string) => void;
}

// Remove marcações HTML básicas (tags)
const stripHtml = (html: string) =>
  html.replace(/<[^>]+>/g, "");

// Remove marcações Markdown básicas
const stripMarkdown = (md: string) =>
  md
    .replace(/^#+\s*/gm, "")       // remove #, ## etc.
    .replace(/\*\*|__|\*|_/g, "")  // remove **, __, *, _
    .replace(/`+/g, "")            // remove backticks
    .replace(/^\s*[-+*]\s+/gm, ""); // remove lista (-, +, *)

const SearchResults = ({ query, setQuery, handleTopicSelect }: SearchResultsProps) => {
  const { conteudo, menu } = useConteudo();

  // monta array pesquisável
  const searchableContent = menu.map(item => {
    const raw = conteudo[item.chave] || "";
    const lower = raw.toLowerCase();
    const isSubsecao = Boolean(item.pai);
    const parent = isSubsecao
      ? menu.find(m => m.chave === item.pai)?.titulo
      : undefined;
    const subsections = menu
      .filter(m => m.pai === item.chave)
      .map(m => m.titulo);

    return {
      chave: item.chave,
      title: item.titulo,
      type: isSubsecao ? "seção" : "página",
      parent,
      sections: subsections,
      raw,
      lower,
    };
  });

  const term = query.trim().toLowerCase();

  // filtra por título, conteúdo ou subseções
  const results = searchableContent.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.lower.includes(term) ||
    item.sections.some(sec => sec.toLowerCase().includes(term))
  );

  const onClickResult = (chave: string) => {
    setQuery("");
    handleTopicSelect(chave);
    window.location.hash = "";
  };

  return (
    <article className="bg-white">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Resultados da pesquisa: "{query}"
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>{results.length} resultado(s) encontrado(s)</span>
        </div>
      </header>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mt-4">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-500 mt-2">
            Tente usar palavras-chave diferentes ou verifique a ortografia.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((item, idx) => {
            // primeiro remove HTML, depois limpa Markdown e remove eventual título na primeira linha
            const noHtml = stripHtml(item.raw);
            const plain = stripMarkdown(noHtml);
            const lines = plain
              .split(/\r?\n/)
              .map(l => l.trim())
              .filter(l => l);
            if (lines[0]?.toLowerCase() === item.title.toLowerCase()) {
              lines.shift();
            }
            const snippetBase = lines.join(" ");
            // truncamento + três pontinhos
            const snippet =
              snippetBase.length > 200
                ? snippetBase.slice(0, 200) + "..."
                : snippetBase;

            return (
              <button
                key={idx}
                onClick={() => onClickResult(item.chave)}
                className="w-full text-left bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.type}
                      </span>
                      {item.parent && (
                        <>
                          <span>•</span>
                          <span>em {item.parent}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {snippet}
                </p>

                {item.sections.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Seções disponíveis:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.sections.map((sec, sidx) => (
                        <span
                          key={sidx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default SearchResults;
