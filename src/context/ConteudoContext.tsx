import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Conteudo = {
  [secao: string]: string;
};

type ConteudoContextType = {
  conteudo: Conteudo;
  atualizarConteudo: (secao: string, novoMarkdown: string) => void;
};

const ConteudoContext = createContext<ConteudoContextType | undefined>(undefined);

const conteudoInicial: Conteudo = {
  home: `# Bem-vindo ao Centro de Conhecimento\nEste é o centro de conhecimento comercial da Polar.`,
  sobre: `## Quem somos?\nA Polar é uma das três unidades de negócio da Ambar Tech.`,
  liderança: `## Liderança\nConheça a liderança da Polar.`,
  comercial: `## Canais e construção\nO time comercial atua com diferentes canais.`,
  consultores: `## Nossos consultores\nConheça nossa equipe.`,
  regiões: `## Regiões atendidas\nVeja nossa atuação por região.`,
  métodos: `## Métodos construtivos\nAtuamos com diferentes métodos como alvenaria.`,
  produtos: `## Principais produtos\nConheça nossos produtos.`,
  portfolio: `## Portfólio\nVeja nosso portfólio completo.`,
  ferramentas: `## Ferramentas\nFerramentas comerciais para o time.`,
  vendas: `## Processo de vendas\nEstrutura de vendas eficiente.`,
  indicadores: `## Indicadores e metas\nKPIs e metas comerciais.`,
  politicas: `## Política comercial\nDiretrizes comerciais da Polar.`,
};

export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
  const [conteudo, setConteudo] = useState<Conteudo>(() => {
    const salvo = localStorage.getItem('conteudo');
    return salvo ? JSON.parse(salvo) : conteudoInicial;
  });

  useEffect(() => {
    localStorage.setItem('conteudo', JSON.stringify(conteudo));
  }, [conteudo]);

  const atualizarConteudo = (secao: string, novoMarkdown: string) => {
    setConteudo((prev) => ({ ...prev, [secao]: novoMarkdown }));
  };

  return (
    <ConteudoContext.Provider value={{ conteudo, atualizarConteudo }}>
      {children}
    </ConteudoContext.Provider>
  );
};

export const useConteudo = () => {
  const context = useContext(ConteudoContext);
  if (!context) throw new Error('useConteudo deve ser usado dentro de um ConteudoProvider');
  return context;
};
