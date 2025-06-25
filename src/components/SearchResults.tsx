import { Search } from "lucide-react";

interface ViewType {
  type: 'article' | 'search';
  data: any;
};

interface SearchResultsProps {
  query: string;
  setQuery: (value: string) => void;
  handleTopicSelect: (topic: string) => void;
}

const searchableContent = [
  {
    title: "home",
    type: "página",
    sections: [],
    content: "Bem-vindo ao Playbook Comercial Polar centro conhecimento comercial práticas processos diretrizes"
  },
  {
    title: "sobre",
    type: "página", 
    sections: [],
    content: "Polar Comercial empresa componentes tecnológicos construção civil missão valores inovação qualidade sustentabilidade parceria"
  },
  {
    title: "liderança",
    type: "página",
    sections: [],
    content: "estrutura liderança diretoria comercial gerência vendas coordenação regional estratégia"
  },
  {
    title: "Time comercial",
    type: "página",
    sections: ["Estrutura organizacional", "Perfis e responsabilidades", "Contatos"],
    content: "equipe comercial organização estrutura responsabilidades contatos vendedores"
  },
  {
    title: "Estrutura organizacional", 
    type: "seção",
    parent: "Time comercial",
    sections: [],
    content: "organização hierarquia estrutura organizacional equipe comercial cargos funções"
  },
  {
    title: "Perfis e responsabilidades",
    type: "seção", 
    parent: "Time comercial",
    sections: [],
    content: "perfis responsabilidades atribuições funções colaboradores vendedores gerentes"
  },
  {
    title: "Contatos",
    type: "seção",
    parent: "Time comercial", 
    sections: [],
    content: "contatos telefones emails endereços equipe comercial"
  },
  {
    title: "Portfólio",
    type: "página",
    sections: ["Produtos principais", "Soluções específicas", "Catálogos"],
    content: "produtos soluções portfólio catálogos componentes tecnológicos construção"
  },
  {
    title: "Produtos principais",
    type: "seção",
    parent: "Portfólio",
    sections: [],
    content: "produtos principais linha produtos componentes tecnológicos construção civil"
  },
  {
    title: "Soluções específicas", 
    type: "seção",
    parent: "Portfólio",
    sections: [],
    content: "soluções específicas customizadas clientes projetos especiais"
  },
  {
    title: "Catálogos",
    type: "seção",
    parent: "Portfólio", 
    sections: [],
    content: "catálogos produtos documentação técnica especificações"
  },
  {
    title: "Ferramentas",
    type: "página",
    sections: ["CRM", "Sistemas internos", "Planilhas e templates"],
    content: "ferramentas sistemas CRM planilhas templates"
  },
  {
    title: "CRM",
    type: "seção",
    parent: "Ferramentas",
    sections: [],
    content: "CRM sistema gestão relacionamento clientes vendas"
  },
  {
    title: "Sistemas internos",
    type: "seção", 
    parent: "Ferramentas",
    sections: [],
    content: "sistemas internos gestão administrativa operacional"
  },
  {
    title: "Planilhas e templates",
    type: "seção",
    parent: "Ferramentas", 
    sections: [],
    content: "planilhas templates modelos documentos comerciais"
  },
  {
    title: "Processo de vendas",
    type: "página", 
    sections: ["Prospecção", "Apresentação", "Negociação", "Fechamento"],
    content: "processo vendas prospecção apresentação negociação fechamento"
  },
  {
    title: "Prospecção",
    type: "seção",
    parent: "Processo de vendas",
    sections: [],
    content: "prospecção clientes identificação oportunidades mercado pesquisa"
  },
  {
    title: "Apresentação",
    type: "seção",
    parent: "Processo de vendas", 
    sections: [],
    content: "apresentação produtos soluções demonstração técnica propostas"
  },
  {
    title: "Negociação",
    type: "seção",
    parent: "Processo de vendas",
    sections: [],
    content: "negociação preços condições prazos aprovação crédito"
  },
  {
    title: "Fechamento", 
    type: "seção",
    parent: "Processo de vendas",
    sections: [],
    content: "fechamento conclusão venda contrato entrega acompanhamento"
  },
  {
    title: "Indicadores e metas",
    type: "página",
    sections: [],
    content: "indicadores metas performance resultados vendas"
  },
  {
    title: "Política comercial",
    type: "página", 
    sections: ["Preços e descontos", "Condições de pagamento", "Políticas de crédito"],
    content: "política comercial preços descontos pagamento crédito"
  },
  {
    title: "Preços e descontos",
    type: "seção",
    parent: "Política comercial",
    sections: [],
    content: "preços descontos tabela preços política descontos"
  },
  {
    title: "Condições de pagamento",
    type: "seção", 
    parent: "Política comercial",
    sections: [],
    content: "condições pagamento prazos formas pagamento financiamento"
  },
  {
    title: "Políticas de crédito",
    type: "seção",
    parent: "Política comercial", 
    sections: [],
    content: "políticas crédito análise crédito aprovação limite crédito"
  }
];

const SearchResults = ({ query, setQuery, handleTopicSelect }: SearchResultsProps) => {
  const searchResults = searchableContent.filter(item => {
    const searchTerm = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.sections.some(section => section.toLowerCase().includes(searchTerm))
    );
  });

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
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    {result.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {result.type}
                    </span>
                    {result.parent && (
                      <>
                        <span>•</span>
                        <span>em {result.parent}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {result.content.substring(0, 200)}...
              </p>
              
              {result.sections.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Seções disponíveis:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.sections.map((section, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </article>
  );
};

export default SearchResults;
