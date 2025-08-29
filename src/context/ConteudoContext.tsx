import { ContentItem, ContentService } from "@/services/contentService";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ConteudoMap = Record<string, ContentItem>;

type ConteudoContextType = {
  conteudo: ConteudoMap;
  atualizarConteudo: (key: string, value: string, title?: string, dad?: string) => Promise<void>;
  deletarConteudo: (key: string) => Promise<void>;
  carregarMenu: () => { key: string; title: string; dad?: string }[];
};

const ConteudoContext = createContext<ConteudoContextType | undefined>(undefined);

export const ConteudoProvider = ({ children }: { children: ReactNode }) => {
  const [conteudo, setConteudo] = useState<ConteudoMap>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ContentService.getAll();
        const map: ConteudoMap = {};
        data.forEach(item => {
          map[item.key] = item;
        });
        setConteudo(map);
      } catch (err) {
        console.error("Erro ao carregar conteúdos:", err);
      }
    }
    fetchData();
  }, []);

  const atualizarConteudo = async (key: string, value: string, title?: string, dad?: string) => {
    const payload: ContentItem = { key, value, title: title || key.replace(/-/g, " "), dad: dad || null };
    try {
      await ContentService.createOrUpdate(payload);
      setConteudo(prev => ({ ...prev, [key]: payload }));
    } catch (err) {
      console.error("Erro ao atualizar/criar conteúdo:", err);
    }
  };

  const deletarConteudo = async (key: string) => {
    try {
      await ContentService.delete(key);
      setConteudo(prev => {
        const novo = { ...prev };
        delete novo[key];
        return novo;
      });
    } catch (err) {
      console.error("Erro ao deletar conteúdo:", err);
    }
  };

  const carregarMenu = () => {
    return Object.values(conteudo).map(item => ({
      key: item.key,
      title: item.title || item.key.replace(/-/g, " "),
      dad: item.dad || undefined,
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
  if (!ctx) throw new Error("useConteudo deve ser usado dentro de ConteudoProvider");
  return ctx;
};
