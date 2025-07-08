// src/pages/Admin.tsx
import { useState, useEffect } from 'react';
import { useConteudo, MenuItem } from '@/context/ConteudoContext';
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
  politicas: "Política comercial",
};

const Admin = () => {
  const { conteudo, atualizarConteudo, menu, atualizarMenu } = useConteudo();

  // seleção e edição de conteúdo
  const [selecao, setSelecao] = useState<string>('home');
  const [markdown, setMarkdown] = useState<string>('');
  const [originalMarkdown, setOriginalMarkdown] = useState<string>('');
  const [previewAtivo, setPreviewAtivo] = useState<boolean>(false);
  const [previewHTML, setPreviewHTML] = useState<string>('');

  // gerenciamento de menu
  const [novaChave, setNovaChave] = useState<string>('');
  const [novoTitulo, setNovoTitulo] = useState<string>('');
  const [novoPai, setNovoPai] = useState<string>('');

  // carrega o markdown ao mudar de seção
  useEffect(() => {
    const md = conteudo[selecao] || '';
    setMarkdown(md);
    setOriginalMarkdown(md);
    setPreviewAtivo(false);
  }, [selecao, conteudo]);

  // atualiza o preview lidando com string ou Promise<string>
  useEffect(() => {
    const resultado = marked.parse(markdown);
    if (typeof resultado === 'string') {
      setPreviewHTML(resultado);
    } else {
      resultado.then(html => setPreviewHTML(html));
    }
  }, [markdown]);

  // salvar conteúdo
  const handleSalvarConteudo = async () => {
    await atualizarConteudo(selecao, markdown);
    setOriginalMarkdown(markdown);
    alert(`Seção "${nomesDasSecoes[selecao] || selecao}" atualizada com sucesso!`);
  };

  // descartar edição
  const handleDescartar = () => {
    setMarkdown(originalMarkdown);
  };

  // adicionar nova seção/subseção
  const handleAdicionarSecao = async () => {
    if (!novaChave.trim() || !novoTitulo.trim()) {
      return alert('Chave e título são obrigatórios.');
    }
    if (menu.some(item => item.chave === novaChave)) {
      return alert('Já existe uma seção com essa chave.');
    }
    const novoMenu: MenuItem[] = [
      ...menu,
      { chave: novaChave, titulo: novoTitulo, pai: novoPai || undefined },
    ];
    await atualizarMenu(novoMenu);
    setNovaChave('');
    setNovoTitulo('');
    setNovoPai('');
  };

  // remover seção/subseção
  const handleRemoverSecao = async (chave: string) => {
    if (!confirm('Tem certeza que deseja remover esta seção?')) return;
    const novoMenu = menu.filter(item => item.chave !== chave);
    await atualizarMenu(novoMenu);
    if (selecao === chave) setSelecao('home');
  };

  const houveMudanca = markdown !== originalMarkdown;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar selecao={selecao} onSelect={setSelecao} />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        {/* Gerenciar Seções */}
        <section className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Gerenciar Seções</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              placeholder="Chave (ex: novoservico)"
              value={novaChave}
              onChange={e => setNovaChave(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <input
              placeholder="Título (ex: Novo Serviço)"
              value={novoTitulo}
              onChange={e => setNovoTitulo(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <select
              value={novoPai}
              onChange={e => setNovoPai(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Sem pai (seção principal)</option>
              {menu.map(item => (
                <option key={item.chave} value={item.chave}>
                  {item.titulo}
                </option>
              ))}
            </select>
            <button
              onClick={handleAdicionarSecao}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
          <ul className="divide-y">
            {menu.map(item => (
              <li key={item.chave} className="flex justify-between items-center py-1">
                <span>{item.pai ? `— ${item.titulo}` : item.titulo}</span>
                <button
                  onClick={() => handleRemoverSecao(item.chave)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Editor de Conteúdo */}
        <section className="bg-white p-6 rounded shadow">
          <header className="flex justify-between items-center mb-4">
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
          </header>

          {!previewAtivo ? (
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded font-mono"
            />
          ) : (
            <div
              className="prose prose-lg max-w-none p-4 bg-gray-50 border border-gray-200 rounded"
              dangerouslySetInnerHTML={{ __html: previewHTML }}
            />
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSalvarConteudo}
              disabled={!houveMudanca}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Salvar conteúdo
            </button>
            <button
              onClick={handleDescartar}
              disabled={!houveMudanca}
              className={`px-6 py-2 rounded border ${
                houveMudanca
                  ? 'bg-white text-red-600 border-red-600 hover:bg-red-50'
                  : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
              }`}
            >
              Descartar alterações
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
