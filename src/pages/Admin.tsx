// src/pages/Admin.tsx
import { useState, useEffect } from 'react';
import { useConteudo } from '@/context/ConteudoContext';
import { marked } from 'marked';
import AdminSidebar from '@/components/AdminSidebar';

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
  política: "Política comercial",
};

const Admin = () => {
  const { conteudo, atualizarConteudo } = useConteudo();
  const [selecao, setSelecao] = useState('home');
  const [markdown, setMarkdown] = useState('');
  const [previewAtivo, setPreviewAtivo] = useState(false);
  const [previewHTML, setPreviewHTML] = useState('');
  const [originalMarkdown, setOriginalMarkdown] = useState('');

  const handleSelecionarSecao = (secao: string) => {
    setSelecao(secao);
    const markdownOriginal = conteudo[secao] || '';
    setMarkdown(markdownOriginal);
    setOriginalMarkdown(markdownOriginal);
  };

  const handleSalvar = () => {
    atualizarConteudo(selecao, markdown);
    alert(`Seção "${nomesDasSecoes[selecao] || selecao}" atualizada com sucesso!`);
    setOriginalMarkdown(markdown);
  };

  const handleDescartar = () => {
    setMarkdown(originalMarkdown);
  };

  useEffect(() => {
    const atualizarPreview = async () => {
      const html = await marked.parse(markdown);
      setPreviewHTML(html);
    };
    atualizarPreview();
  }, [markdown]);

  useEffect(() => {
    handleSelecionarSecao('home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const houveMudanca = markdown !== originalMarkdown;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar selecao={selecao} onSelect={handleSelecionarSecao} />

      <main className="flex-1 p-8 space-y-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Editando: {nomesDasSecoes[selecao] || selecao}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewAtivo(false)}
              className={`px-4 py-2 rounded ${
                !previewAtivo ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setPreviewAtivo(true)}
              className={`px-4 py-2 rounded ${
                previewAtivo ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {!previewAtivo ? (
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[500px] p-4 border border-gray-300 rounded font-mono"
          />
        ) : (
          <div
            className="prose prose-lg max-w-none p-4 bg-white border rounded shadow"
            dangerouslySetInnerHTML={{ __html: previewHTML }}
          />
        )}

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSalvar}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!houveMudanca}
          >
            Salvar conteúdo
          </button>
          <button
            onClick={handleDescartar}
            className={`px-6 py-2 rounded border ${
              houveMudanca
                ? 'bg-white text-red-600 border-red-600 hover:bg-red-50'
                : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
            }`}
            disabled={!houveMudanca}
          >
            Descartar alterações
          </button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
