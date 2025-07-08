// src/context/ConteudoContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type MenuItem = {
  chave: string;
  titulo: string;
  pai?: string;
};

type Conteudo = Record<string, string>;

type ConteudoContextType = {
  conteudo: Conteudo;
  menu: MenuItem[];
  atualizarConteudo: (secao: string, novoMarkdown: string) => Promise<void>;
  atualizarMenu: (novoMenu: MenuItem[]) => Promise<void>;
};

const ConteudoContext = createContext<ConteudoContextType | undefined>(
  undefined
);

export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
  const [conteudo, setConteudo] = useState<Conteudo>({});
  const [menu, setMenu] = useState<MenuItem[]>([]);

  // carregar conteúdo e menu na montagem
  useEffect(() => {
    async function fetchData() {
      const [cRes, mRes] = await Promise.all([
        fetch('/api/conteudo'),
        fetch('/api/menu'),
      ]);
      if (cRes.ok && mRes.ok) {
        setConteudo(await cRes.json());
        setMenu(await mRes.json());
      } else {
        console.error('Falha ao carregar dados iniciais');
      }
    }
    fetchData();
  }, []);

  // salva no backend e atualiza local
  const atualizarConteudo = async (
    secao: string,
    novoMarkdown: string
  ) => {
    const updated = { ...conteudo, [secao]: novoMarkdown };
    const res = await fetch('/api/conteudo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (res.ok) setConteudo(updated);
    else console.error('Erro ao salvar conteúdo');
  };

  const atualizarMenu = async (novoMenu: MenuItem[]) => {
    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoMenu),
    });
    if (res.ok) setMenu(novoMenu);
    else console.error('Erro ao salvar menu');
  };

  return (
    <ConteudoContext.Provider
      value={{ conteudo, menu, atualizarConteudo, atualizarMenu }}
    >
      {children}
    </ConteudoContext.Provider>
  );
};

export const useConteudo = () => {
  const ctx = useContext(ConteudoContext);
  if (!ctx)
    throw new Error('useConteudo deve ser usado dentro de ConteudoProvider');
  return ctx;
};
