// src/components/ArticleContent.tsx
import { useConteudo } from '@/context/ConteudoContext';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

interface ArticleContentProps {
  topic: string;
}

const nomesDasSecoes: Record<string, string> = {
  home: "Home",
  sobre: "Quem somos?",
  liderança: "Liderança",
  vendas: "Processo de vendas",
  comercial: "Canais e construção",
  consultores: "Nossos consultores",
  regiões: "Regiões atendidas",
  métodos: "Métodos construtivos",
  produtos: "Principais produtos",
  ferramentas: "Ferramentas",
  indicadores: "Indicadores e metas",
  politicas: "Política comercial",
};

const ArticleContent = ({ topic }: ArticleContentProps) => {
  const { conteudo } = useConteudo();
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const md =
      conteudo[topic] ||
      `### Conteúdo da seção "${nomesDasSecoes[topic] || topic}" ainda não configurado.`;

    // marked.parse pode retornar string ou Promise<string>
    const resultado = marked.parse(md);
    if (typeof resultado === 'string') {
      setHtml(resultado);
    } else {
      resultado.then(rendered => setHtml(rendered));
    }
  }, [topic, conteudo]);

  return (
    <article className="bg-white">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {nomesDasSecoes[topic] || topic}
        </h1>
        <div className="text-sm text-gray-500">Última atualização: Julho 2025</div>
      </header>
      <div
        className="prose prose-blue prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
};

export default ArticleContent;
