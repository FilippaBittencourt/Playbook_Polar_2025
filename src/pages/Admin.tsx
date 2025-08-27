// src/pages/Admin.tsx
import { useState, useEffect } from 'react'
import { useConteudo, ConteudoItem } from '@/context/ConteudoContext'
import { marked } from 'marked'
import AdminSidebar from '@/components/AdminSidebar'

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
}

const formatarTitulo = (chave: string) =>
  nomesDasSecoes[chave] || chave.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const Admin = () => {
  const { conteudo, atualizarConteudo, deletarConteudo } = useConteudo()

  const [selecao, setSelecao] = useState<string>('home')
  const [markdown, setMarkdown] = useState<string>('')
  const [originalMarkdown, setOriginalMarkdown] = useState<string>('')

  const [previewAtivo, setPreviewAtivo] = useState<boolean>(false)
  const [previewHTML, setPreviewHTML] = useState<string>('')

  const [novaChave, setNovaChave] = useState<string>('')
  const [novoPai, setNovoPai] = useState<string>('')

  const [modoEdicaoTitulo, setModoEdicaoTitulo] = useState<string | null>(null)
  const [tituloEditado, setTituloEditado] = useState<string>('')

  // Carregar conteúdo da seleção atual
  useEffect(() => {
    const item = conteudo[selecao]
    const md = item?.valor || ''
    setMarkdown(md)
    setOriginalMarkdown(md)
    setPreviewAtivo(false)
  }, [selecao, conteudo])

  // Atualizar preview HTML
  useEffect(() => {
    const parsed = marked.parse(markdown)
    if (typeof parsed === 'string') {
      setPreviewHTML(parsed)
    } else {
      parsed.then(html => setPreviewHTML(html))
    }
  }, [markdown])

  const menu = Object.values(conteudo)

  const handleSalvarConteudo = async () => {
    await atualizarConteudo(selecao, markdown, conteudo[selecao]?.pai || undefined)
    setOriginalMarkdown(markdown)
    alert(`Seção "${formatarTitulo(selecao)}" atualizada com sucesso!`)
  }

  const handleDescartar = () => {
    setMarkdown(originalMarkdown)
  }

  const handleAdicionarSecao = async () => {
    const chave = novaChave.trim()
    if (!chave) return alert('Chave é obrigatória.')

    if (conteudo[chave]) return alert('Já existe uma seção com essa chave.')

    if (novoPai) {
      const paiItem = conteudo[novoPai]
      if (paiItem?.pai) {
        return alert('Não é permitido criar uma subseção dentro de outra subseção.')
      }
    }

    await atualizarConteudo(chave, '', novoPai || undefined)

    setSelecao(chave)
    setNovaChave('')
    setNovoPai('')
  }

  const handleRemoverSecao = async (chave: string) => {
    if (!confirm('Tem certeza que deseja remover esta seção? Isso removerá também as subseções.')) return
    try {
      await deletarConteudo(chave)
      alert('Seção removida com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao remover seção.')
    }
  }

  const houveMudanca = markdown !== originalMarkdown

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        selecao={selecao}
        onSelect={setSelecao}
        menu={menu}
        formatarTitulo={formatarTitulo}
      />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
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

        <section className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Gerenciar Seções</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              placeholder="Chave (ex: novoservico)"
              value={novaChave}
              onChange={e => setNovaChave(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <select
              value={novoPai}
              onChange={e => setNovoPai(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Sem pai (seção principal)</option>
              {menu
                .filter(item => !item.pai)
                .map(item => (
                  <option key={item.chave} value={item.chave}>
                    {formatarTitulo(item.chave)}
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
              .filter(item => !item.pai)
              .map(pai => (
                <div key={pai.chave}>
                  <li className="flex justify-between items-center py-1 gap-2">
                    <span>{formatarTitulo(pai.chave)}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRemoverSecao(pai.chave)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                  {menu
                    .filter(filho => filho.pai === pai.chave)
                    .map(filho => (
                      <li
                        key={filho.chave}
                        className="flex justify-between items-center py-1 gap-2 pl-6"
                      >
                        <span>— {formatarTitulo(filho.chave)}</span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleRemoverSecao(filho.chave)}
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
      </main>
    </div>
  )
}

export default Admin
