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

const API_BASE = 'https://backend-playbook-production.up.railway.app';

export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
  const [conteudo, setConteudo] = useState<Conteudo>({});
  const [menu, setMenu] = useState<MenuItem[]>([]);

  // carregar conteúdo e menu na montagem
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/conteudos`);
        if (!res.ok) throw new Error('Erro ao buscar conteúdos');
        const data = await res.json();

        // Converter array de objetos em um objeto chave-valor
        const conteudoMap: Conteudo = {};
        data.forEach((item: { chave: string; valor: string }) => {
          conteudoMap[item.chave] = item.valor;
        });
        setConteudo(conteudoMap);

        // MOCK de menu, ajuste aqui ou integre com backend futuramente
        setMenu([
          { chave: 'home', titulo: 'Home' },
          { chave: 'sobre', titulo: 'Sobre' },
          { chave: 'institucional', titulo: 'Institucional', pai: 'sobre' },
        ]);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    }
    fetchData();
  }, []);

  // atualiza backend e local
  const atualizarConteudo = async (secao: string, novoMarkdown: string) => {
    const updated = { ...conteudo, [secao]: novoMarkdown };

    const res = await fetch(`${API_BASE}/conteudo/${encodeURIComponent(secao)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor: novoMarkdown }),
    });

    if (res.ok) {
      setConteudo(updated);
    } else {
      console.error('Erro ao salvar conteúdo');
    }
  };

  // menu local por enquanto (você pode substituir essa função futuramente)
  const atualizarMenu = async (novoMenu: MenuItem[]) => {
    setMenu(novoMenu);
    console.warn('🔧 Menu atualizado localmente. Adicione suporte no backend se necessário.');
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
