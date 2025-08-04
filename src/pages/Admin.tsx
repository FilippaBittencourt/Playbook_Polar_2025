// src/pages/Admin.tsx
import { useState, useEffect } from 'react'
import { useConteudo, MenuItem } from '@/context/ConteudoContext'
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

const Admin = () => {
  const { conteudo, atualizarConteudo, menu, atualizarMenu } = useConteudo()

  const [selecao, setSelecao] = useState<string>('home')
  const [markdown, setMarkdown] = useState<string>('')
  const [originalMarkdown, setOriginalMarkdown] = useState<string>('')
  const [previewAtivo, setPreviewAtivo] = useState<boolean>(false)
  const [previewHTML, setPreviewHTML] = useState<string>('')

  const [novaChave, setNovaChave] = useState<string>('')
  const [novoTitulo, setNovoTitulo] = useState<string>('')
  const [novoPai, setNovoPai] = useState<string>('')

  const [modoEdicaoTitulo, setModoEdicaoTitulo] = useState<string | null>(null)
  const [tituloEditado, setTituloEditado] = useState<string>('')

  useEffect(() => {
    const md = conteudo[selecao] || ''
    setMarkdown(md)
    setOriginalMarkdown(md)
    setPreviewAtivo(false)
  }, [selecao, conteudo])

  useEffect(() => {
    const parsed = marked.parse(markdown)
    if (typeof parsed === 'string') {
      setPreviewHTML(parsed)
    } else {
      parsed.then(html => setPreviewHTML(html))
    }
  }, [markdown])

  const handleSalvarConteudo = async () => {
    await atualizarConteudo(selecao, markdown)
    setOriginalMarkdown(markdown)
    alert(`Seção "${nomesDasSecoes[selecao] || selecao}" atualizada com sucesso!`)
  }

  const handleDescartar = () => {
    setMarkdown(originalMarkdown)
  }

  const handleAdicionarSecao = async () => {
    if (!novaChave.trim() || !novoTitulo.trim()) {
      return alert('Chave e título são obrigatórios.')
    }
    if (menu.some(item => item.chave === novaChave)) {
      return alert('Já existe uma seção com essa chave.')
    }

    const paiSelecionado = menu.find(item => item.chave === novoPai)
    if (paiSelecionado?.pai) {
      return alert('Não é permitido criar uma subseção dentro de outra subseção.')
    }

    const novoMenu: MenuItem[] = [
      ...menu,
      { chave: novaChave, titulo: novoTitulo, pai: novoPai || undefined },
    ]
    await atualizarMenu(novoMenu)
    setNovaChave('')
    setNovoTitulo('')
    setNovoPai('')
  }

  const handleRemoverSecao = async (chave: string) => {
    if (!confirm('Tem certeza que deseja remover esta seção?')) return
    const novoMenu = menu.filter(item => item.chave !== chave)
    await atualizarMenu(novoMenu)
    if (selecao === chave) setSelecao('home')
  }

  const handleEditarTitulo = (item: MenuItem) => {
    setModoEdicaoTitulo(item.chave)
    setTituloEditado(item.titulo)
  }

  const handleSalvarEdicaoTitulo = async (chave: string) => {
    const novoMenu = menu.map(item =>
      item.chave === chave ? { ...item, titulo: tituloEditado } : item
    )
    await atualizarMenu(novoMenu)
    setModoEdicaoTitulo(null)
    setTituloEditado('')
  }

  const handleMover = async (chave: string, direcao: 'cima' | 'baixo') => {
    const index = menu.findIndex(item => item.chave === chave)
    if (index === -1) return
    const novoMenu = [...menu]
    const novoIndex = direcao === 'cima' ? index - 1 : index + 1
    if (novoIndex < 0 || novoIndex >= menu.length) return
    const temp = novoMenu[index]
    novoMenu[index] = novoMenu[novoIndex]
    novoMenu[novoIndex] = temp
    await atualizarMenu(novoMenu)
  }

  const houveMudanca = markdown !== originalMarkdown

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar selecao={selecao} onSelect={setSelecao} />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <section className="bg-white p-6 rounded shadow">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-700">
              Editando: {nomesDasSecoes[selecao] || selecao}
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
            {menu
              .filter(item => !item.pai)
              .map((pai) => (
                <div key={pai.chave}>
                  <li className="flex justify-between items-center py-1 gap-2">
                    {modoEdicaoTitulo === pai.chave ? (
                      <>
                        <input
                          value={tituloEditado}
                          onChange={(e) => setTituloEditado(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                        <button onClick={() => handleSalvarEdicaoTitulo(pai.chave)} className="text-green-600 text-sm">Salvar</button>
                        <button onClick={() => setModoEdicaoTitulo(null)} className="text-gray-500 text-sm">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <span>{pai.titulo}</span>
                        <div className="flex gap-3">
                          <button onClick={() => handleMover(pai.chave, 'cima')} className="text-gray-500 text-sm">↑</button>
                          <button onClick={() => handleMover(pai.chave, 'baixo')} className="text-gray-500 text-sm">↓</button>
                          <button onClick={() => handleEditarTitulo(pai)} className="text-blue-600 hover:underline text-sm">Editar título</button>
                          <button onClick={() => handleRemoverSecao(pai.chave)} className="text-red-600 hover:underline text-sm">Remover</button>
                        </div>
                      </>
                    )}
                  </li>
                  {menu
                    .filter(filho => filho.pai === pai.chave)
                    .map((filho) => (
                      <li key={filho.chave} className="flex justify-between items-center py-1 gap-2 pl-6">
                        {modoEdicaoTitulo === filho.chave ? (
                          <>
                            <input
                              value={tituloEditado}
                              onChange={(e) => setTituloEditado(e.target.value)}
                              className="border px-2 py-1 rounded w-full"
                            />
                            <button onClick={() => handleSalvarEdicaoTitulo(filho.chave)} className="text-green-600 text-sm">Salvar</button>
                            <button onClick={() => setModoEdicaoTitulo(null)} className="text-gray-500 text-sm">Cancelar</button>
                          </>
                        ) : (
                          <>
                            <span>— {filho.titulo}</span>
                            <div className="flex gap-3">
                              <button onClick={() => handleMover(filho.chave, 'cima')} className="text-gray-500 text-sm">↑</button>
                              <button onClick={() => handleMover(filho.chave, 'baixo')} className="text-gray-500 text-sm">↓</button>
                              <button onClick={() => handleEditarTitulo(filho)} className="text-blue-600 hover:underline text-sm">Editar título</button>
                              <button onClick={() => handleRemoverSecao(filho.chave)} className="text-red-600 hover:underline text-sm">Remover</button>
                            </div>
                          </>
                        )}
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
