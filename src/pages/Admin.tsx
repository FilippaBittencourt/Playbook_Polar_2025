import { useState, useEffect } from 'react';
import { useConteudo } from '@/context/ConteudoContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import AdminSidebar from '@/components/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/AdminHeader';

const Admin = () => {
  const { conteudo, atualizarConteudo, deletarConteudo } = useConteudo();
  const navigate = useNavigate();

  const [selecao, setSelecao] = useState<string>('home');
  const [markdown, setMarkdown] = useState<string>('');
  const [originalMarkdown, setOriginalMarkdown] = useState<string>('');
  const [previewAtivo, setPreviewAtivo] = useState<boolean>(false);

  const [novaChave, setNovaChave] = useState<string>('');
  const [novoTitulo, setNovoTitulo] = useState<string>(''); // NOVO
  const [novoDad, setNovoDad] = useState<string>('');

  // Carregar conteúdo da seleção atual
  useEffect(() => {
    const item = conteudo[selecao];
    const value = item?.value || '';
    setMarkdown(value);
    setOriginalMarkdown(value);
    setPreviewAtivo(false);
  }, [selecao, conteudo]);

  const menu = Object.values(conteudo);

  const formatarTitulo = (key: string) =>
    conteudo[key]?.title ||
    key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const houveMudanca = markdown !== originalMarkdown;

  // Salvar conteúdo
  const handleSalvarConteudo = async () => {
    const item = conteudo[selecao];
    if (!item?.title) return alert('Título obrigatório!');
    await atualizarConteudo(selecao, markdown, item.title, item?.dad || undefined);
    setOriginalMarkdown(markdown);
    alert(`Seção "${formatarTitulo(selecao)}" atualizada com sucesso!`);
  };

  const handleDescartar = () => {
    setMarkdown(originalMarkdown);
  };

  // Adicionar nova seção
  const handleAdicionarSecao = async () => {
    const chave = novaChave.trim();
    const titulo = novoTitulo.trim();

    if (!chave) return alert('Chave é obrigatória.');
    if (!titulo) return alert('Título é obrigatório.');
    if (conteudo[chave]) return alert('Já existe uma seção com essa chave.');
    if (novoDad && conteudo[novoDad]?.dad)
      return alert('Não é permitido criar uma subseção dentro de outra subseção.');

    await atualizarConteudo(chave, '', titulo, novoDad || undefined);
    setSelecao(chave);
    setNovaChave('');
    setNovoTitulo('');
    setNovoDad('');
  };

  // Remover seção
  const handleRemoverSecao = async (chave: string) => {
    if (!confirm('Tem certeza que deseja remover esta seção? Isso removerá também as subseções.')) return;
    try {
      await deletarConteudo(chave);
      alert('Seção removida com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao remover seção.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        selecao={selecao}
        onSelect={setSelecao}
        menu={menu}
        formatarTitulo={formatarTitulo}
      />

      <main className="flex-1 flex flex-col">
        <AdminHeader
          buttons={[
            {
              label: "Home",
              onClick: () => navigate("/home"),
              className: "bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300",
            },
          ]}
        />

        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          {/* Editor / Preview */}
          <section className="bg-white p-6 rounded shadow">
            <header className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-blue-700">
                Editando: {formatarTitulo(selecao)}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewAtivo(false)}
                  className={`px-4 py-2 rounded ${!previewAtivo ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setPreviewAtivo(true)}
                  className={`px-4 py-2 rounded ${previewAtivo ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Preview
                </button>
              </div>
            </header>

            {!previewAtivo ? (
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded font-mono"
              />
            ) : (
              <div className="prose prose-lg max-w-none p-4 bg-gray-50 border border-gray-200 rounded">
                <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} />
              </div>
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

          {/* Gerenciar Seções */}
          <section className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Gerenciar Seções</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <input
                placeholder="Chave (ex: novoservico)"
                value={novaChave}
                onChange={(e) => setNovaChave(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="Título (ex: Novo Serviço)"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <select
                value={novoDad}
                onChange={(e) => setNovoDad(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">Sem pai (seção principal)</option>
                {menu
                  .filter((item) => !item.dad)
                  .map((item) => (
                    <option key={item.key} value={item.key}>
                      {formatarTitulo(item.key)}
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
              {menu
                .filter((item) => !item.dad)
                .map((pai) => (
                  <div key={pai.key}>
                    <li className="flex justify-between items-center py-1 gap-2">
                      <span>{formatarTitulo(pai.key)}</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRemoverSecao(pai.key)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                    {menu
                      .filter((filho) => filho.dad === pai.key)
                      .map((filho) => (
                        <li key={filho.key} className="flex justify-between items-center py-1 gap-2 pl-6">
                          <span>— {formatarTitulo(filho.key)}</span>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleRemoverSecao(filho.key)}
                              className="text-red-600 hover:underline text-sm"
                            >
                              Remover
                            </button>
                          </div>
                        </li>
                      ))}
                  </div>
                ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Admin;
