import { useConteudo } from '@/context/ConteudoContext';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

interface ArticleContentProps {
  topic: string;
}

const ArticleContent = ({ topic }: ArticleContentProps) => {
  const { conteudo } = useConteudo();
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const markdown = conteudo[topic] || `### Conteúdo da seção "${topic}" ainda não configurado.`;
    const converterMarkdown = async () => {
      const convertido = await marked.parse(markdown);
      setHtml(convertido);
    };
    converterMarkdown();
  }, [topic, conteudo]);

  return (
    <article className="bg-white">
      <div
        className="prose prose-blue prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
};

export default ArticleContent;
