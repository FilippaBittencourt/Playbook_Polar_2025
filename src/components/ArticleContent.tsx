import React, { useEffect, useState } from 'react';
import { useConteudo } from '@/context/ConteudoContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface ArticleContentProps {
  topic: string;
}

// Componentes customizados para blocos especiais
const BlocoDestaque: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bloco-destaque bg-blue-50 p-4 border-l-4 border-blue-500 rounded my-4">
    {children}
  </div>
);

const CardDestaque: React.FC<{ title: string; children: React.ReactNode }> = ({ children }) => (
  <div className="card-destaque border rounded shadow-sm bg-white">
    <div className="text-gray-600 text-sm">{children}</div>
  </div>
);

const ArticleContent: React.FC<ArticleContentProps> = ({ topic }) => {
  const { conteudo } = useConteudo();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const item = conteudo[topic];
    setTitle(item?.title || topic);

    let text = item?.value ?? `Conteúdo da seção "${topic}" ainda não configurado.`;
    text = text.replace(/\\n/g, '\n'); // substitui \n literal

    setContent(text);
  }, [topic, conteudo]);

  // Define componentes customizados para Markdown
  const components = {
    div: ({ node, ...props }: any) => {
      const className = props.className || '';

      if (className.includes('bloco-destaque')) return <BlocoDestaque {...props} />;
      if (className.includes('card-destaque')) {
        const titleEl = React.Children.toArray(props.children).find(
          (child: any) => child.props?.className?.includes('h4-card')
        );
        const cardTitle = titleEl ? (titleEl as any).props.children : 'Card';
        return <CardDestaque title={cardTitle}>{props.children}</CardDestaque>;
      }

      return <div {...props} />;
    },
    // Mapear outros elementos HTML se necessário
  };

  return (
    <article className="bg-white px-6 pt-0 pb-8 flex flex-col">
      {title && (
        <h1 className="mt-0 text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      )}

      <div className="text-sm text-gray-500 mb-4">Última atualização: Setembro 2025</div>

      <hr className="border-gray-200 mb-6" />

      <div className="prose prose-blue prose-lg max-w-none">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        />
      </div>
    </article>
  );
};

export default ArticleContent;
