// src/context/ConteudoContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  
  export type ConteudoItem = {
    chave: string;
    valor: string; // markdown
    pai?: string | null;
  };
  
  type ConteudoMap = Record<string, ConteudoItem>;
  
  type ConteudoContextType = {
    conteudo: ConteudoMap;
    atualizarConteudo: (
      chave: string,
      valor: string,
      pai?: string
    ) => Promise<void>;
    deletarConteudo: (chave: string) => Promise<void>;
    carregarMenu: () => { chave: string; titulo: string; pai?: string }[];
  };
  
  const ConteudoContext = createContext<ConteudoContextType | undefined>(
    undefined
  );
  
  const API_BASE = 'https://backend-playbook-production.up.railway.app';
  
  export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
    const [conteudo, setConteudo] = useState<ConteudoMap>({});
  
    // Carregar todos os conteúdos na montagem
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch(`${API_BASE}/conteudos`);
          if (!res.ok) throw new Error('Erro ao buscar conteúdos');
          const data: ConteudoItem[] = await res.json();
  
          const map: ConteudoMap = {};
          data.forEach(item => {
            map[item.chave] = item;
          });
  
          setConteudo(map);
        } catch (error) {
          console.error('Erro ao carregar dados iniciais:', error);
        }
      }
      fetchData();
    }, []);
  
    const atualizarConteudo = async (
      chave: string,
      valor: string,
      pai?: string
    ) => {
      const payload: ConteudoItem = {
        chave,
        valor,
        pai: pai || null,
      };
  
      const existe = !!conteudo[chave];
  
      try {
        const url = existe
          ? `${API_BASE}/conteudo/${encodeURIComponent(chave)}`
          : `${API_BASE}/conteudo`;
  
        const res = await fetch(url, {
          method: existe ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
  
        if (res.ok) {
          setConteudo(prev => ({
            ...prev,
            [chave]: payload,
          }));
        } else {
          console.error(`Erro ao ${existe ? 'atualizar' : 'criar'} conteúdo`);
        }
      } catch (err) {
        console.error('Erro de conexão ao salvar conteúdo:', err);
      }
    };
  
    const deletarConteudo = async (chave: string) => {
      try {
        const url = `${API_BASE}/conteudo/${encodeURIComponent(chave)}`;
        const res = await fetch(url, {
          method: 'DELETE',
        });
  
        if (res.ok) {
          setConteudo(prev => {
            const novo = { ...prev };
            delete novo[chave];
            return novo;
          });
        } else {
          console.error(`Erro ao deletar conteúdo: ${chave}`);
        }
      } catch (err) {
        console.error('Erro de conexão ao deletar conteúdo:', err);
      }
    };
  
    // Gera um "menu" com base nas chaves e pais
    const carregarMenu = () => {
      return Object.values(conteudo).map(item => ({
        chave: item.chave,
        titulo: item.chave.replace(/-/g, ' '),
        pai: item.pai || undefined,
      }));
    };
  
    return (
      <ConteudoContext.Provider
        value={{ conteudo, atualizarConteudo, deletarConteudo, carregarMenu }}
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
  