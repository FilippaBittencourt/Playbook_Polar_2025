import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import { useConteudo } from '@/context/ConteudoContext'

interface ArticleContentProps {
  topic: string
}

const ArticleContent: React.FC<ArticleContentProps> = ({ topic }) => {
  const { conteudo } = useConteudo()

  const [title, setTitle] = useState<string>('')
  const [bodyHtml, setBodyHtml] = useState<string>('')

  useEffect(() => {
    // Rola para o topo ao trocar de seção
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const rawMd =
      conteudo[topic] ?? `# ${topic}\n\nConteúdo da seção "${topic}" ainda não configurado.`

    // Remove o primeiro título (geralmente "# topic")
    const mdWithoutFirstTitle = rawMd.replace(/^#\s+.*\n?/, '')

    // Encontra o próximo título (##, ### etc.) e extrai
    const nextTitleMatch = mdWithoutFirstTitle.match(/^#{1,6}\s+(.*)/m)
    const extractedTitle = nextTitleMatch ? nextTitleMatch[1].trim() : ''
    setTitle(extractedTitle)

    // Remove o próximo título também do conteúdo
    const mdWithoutDuplicateTitle = nextTitleMatch
      ? mdWithoutFirstTitle.replace(nextTitleMatch[0], '').trim()
      : mdWithoutFirstTitle

    // Converte o restante para HTML
    const html = marked.parse(mdWithoutDuplicateTitle, { async: false })
    setBodyHtml(html)
  }, [topic, conteudo])

  return (
    <article className="bg-white px-6 pt-0 pb-8 flex flex-col">
      {/* 1) Título principal da seção */}
      {title && (
        <h1 className="mt-0 text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
      )}

      {/* 2) Data fixa */}
      <div className="text-sm text-gray-500 mb-4">
        Última atualização: Julho 2025
      </div>

      {/* 3) Linha divisória */}
      <hr className="border-gray-200 mb-6" />

      {/* 4) Corpo do Markdown renderizado */}
      <div
        className="prose prose-blue prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </article>
  )
}

export default ArticleContent
