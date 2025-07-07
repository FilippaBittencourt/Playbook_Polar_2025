// src/context/ConteudoContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Novo tipo de estrutura para o menu lateral
export type EstruturaMenu = {
  chave: string; // identificador único, ex: "home"
  titulo: string; // nome visível, ex: "Home"
  pai?: string; // se for uma subseção, indica a chave do pai
}[];

type Conteudo = {
  [secao: string]: string; // markdown puro de cada seção
};

type ConteudoContextType = {
  conteudo: Conteudo;
  atualizarConteudo: (secao: string, novoMarkdown: string) => void;
  estruturaMenu: EstruturaMenu;
  adicionarSecao: (novaSecao: { chave: string; titulo: string; pai?: string }) => void;
  removerSecao: (chave: string) => void;
};

const ConteudoContext = createContext<ConteudoContextType | undefined>(undefined);

const estruturaPadrao: EstruturaMenu = [
  { chave: 'home', titulo: 'Home' },
  { chave: 'sobre', titulo: 'Quem somos?' },
  { chave: 'liderança', titulo: 'Liderança' },
  { chave: 'consultores', titulo: 'Nossos consultores', pai: 'comercial' },
  { chave: 'regiões', titulo: 'Regiões atendidas', pai: 'comercial' },
  { chave: 'comercial', titulo: 'Canais e construção' },
  { chave: 'métodos', titulo: 'Métodos construtivos', pai: 'portfolio' },
  { chave: 'produtos', titulo: 'Principais produtos', pai: 'portfolio' },
  { chave: 'portfolio', titulo: 'Portfólio' },
  { chave: 'ferramentas', titulo: 'Ferramentas' },
  { chave: 'vendas', titulo: 'Processo de vendas' },
  { chave: 'indicadores', titulo: 'Indicadores e metas' },
  { chave: 'política', titulo: 'Política comercial' },
];

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
  política: `## Política comercial\nDiretrizes comerciais da Polar.`,
};

export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
  const [conteudo, setConteudo] = useState<Conteudo>(() => {
    const salvo = localStorage.getItem('conteudo');
    return salvo ? JSON.parse(salvo) : conteudoInicial;
  });

  const [estruturaMenu, setEstruturaMenu] = useState<EstruturaMenu>(() => {
    const salvo = localStorage.getItem('estruturaMenu');
    return salvo ? JSON.parse(salvo) : estruturaPadrao;
  });

  useEffect(() => {
    localStorage.setItem('conteudo', JSON.stringify(conteudo));
  }, [conteudo]);

  useEffect(() => {
    localStorage.setItem('estruturaMenu', JSON.stringify(estruturaMenu));
  }, [estruturaMenu]);

  const atualizarConteudo = (secao: string, novoMarkdown: string) => {
    setConteudo((prev) => ({ ...prev, [secao]: novoMarkdown }));
  };

  const adicionarSecao = ({ chave, titulo, pai }: { chave: string; titulo: string; pai?: string }) => {
    if (conteudo[chave]) return; // já existe
    setConteudo((prev) => ({ ...prev, [chave]: `## ${titulo}\nNova seção criada.` }));
    setEstruturaMenu((prev) => [...prev, { chave, titulo, pai }]);
  };

  const removerSecao = (chave: string) => {
    setEstruturaMenu((prev) => prev.filter((item) => item.chave !== chave));
    setConteudo((prev) => {
      const novo = { ...prev };
      delete novo[chave];
      return novo;
    });
  };

  return (
    <ConteudoContext.Provider
      value={{ conteudo, atualizarConteudo, estruturaMenu, adicionarSecao, removerSecao }}
    >
      {children}
    </ConteudoContext.Provider>
  );
};

export const useConteudo = () => {
  const context = useContext(ConteudoContext);
  if (!context) throw new Error('useConteudo deve ser usado dentro de um ConteudoProvider');
  return context;
};
