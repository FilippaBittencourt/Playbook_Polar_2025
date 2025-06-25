
interface ArticleContentProps {
  topic: string;
}

const articleData: { [key: string]: any } = {
  "home": {
    title: "Bem-vindo ao Playbook Comercial Polar",
    content: `
      <p class="text-lg mb-6 text-gray-700">Este é o centro de conhecimento comercial da Polar, sua fonte definitiva para informações sobre práticas, processos e diretrizes comerciais.</p>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-800 mb-3">O que você encontrará aqui:</h3>
        <ul class="space-y-2 text-blue-700">
          <li>• Estrutura organizacional e processos comerciais</li>
          <li>• Portfólio completo de produtos e soluções</li>
          <li>• Ferramentas e sistemas para o dia a dia</li>
          <li>• Políticas comerciais e diretrizes de vendas</li>
          <li>• Indicadores de performance e metas</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mb-4 text-gray-800">Navegação Rápida</h3>
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h4 class="font-semibold text-gray-800 mb-2">Para Novos Colaboradores</h4>
          <p class="text-gray-600 text-sm">Comece por "Quem somos?" e "Time comercial" para entender nossa estrutura.</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h4 class="font-semibold text-gray-800 mb-2">Consulta Rápida</h4>
          <p class="text-gray-600 text-sm">Use a barra de pesquisa para encontrar informações específicas rapidamente.</p>
        </div>
      </div>
    `
  },
  "sobre": {
    title: "Sobre a Polar Comercial",
    content: `
      <p class="text-lg mb-6 text-gray-700">A Polar Comercial é uma empresa especializada em componentes tecnológicos para obras da construção civil, oferecendo soluções inovadoras e de alta qualidade para o mercado brasileiro.</p>
      
      <h3 class="text-xl font-semibold mb-4 text-gray-800">Nossa Missão</h3>
      <p class="mb-6 text-gray-700">Fornecer componentes tecnológicos de excelência para a construção civil, contribuindo para o desenvolvimento de obras mais eficientes, sustentáveis e duradouras.</p>
      
      <h3 class="text-xl font-semibold mb-4 text-gray-800">Nossos Valores</h3>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Inovação</h4>
          <p class="text-blue-700 text-sm">Buscamos constantemente novas tecnologias e soluções para atender as demandas do mercado.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Qualidade</h4>
          <p class="text-blue-700 text-sm">Compromisso com a excelência em todos os produtos e serviços oferecidos.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Sustentabilidade</h4>
          <p class="text-blue-700 text-sm">Responsabilidade ambiental em todas as nossas operações e produtos.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Parceria</h4>
          <p class="text-blue-700 text-sm">Relacionamentos duradouros baseados na confiança e transparência.</p>
        </div>
      </div>
    `
  },
  "liderança": {
    title: "Estrutura de Liderança",
    content: `
      <p class="text-lg mb-6 text-gray-700">Conheça a estrutura de liderança da Polar Comercial e os principais executivos responsáveis pela direção estratégica da empresa.</p>
      
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-800 mb-2">Diretoria Comercial</h4>
          <p class="text-gray-600 mb-3">Responsável pela estratégia comercial, desenvolvimento de novos mercados e relacionamento com grandes clientes.</p>
          <div class="text-sm text-gray-500">
            <p>• Definição de estratégias de vendas</p>
            <p>• Aprovação de grandes negociações</p>
            <p>• Desenvolvimento de parcerias estratégicas</p>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-800 mb-2">Gerência de Vendas</h4>
          <p class="text-gray-600 mb-3">Supervisiona as operações de vendas regionais e coordena as equipes comerciais.</p>
          <div class="text-sm text-gray-500">
            <p>• Gestão das equipes de vendas</p>
            <p>• Acompanhamento de metas e resultados</p>
            <p>• Treinamento e desenvolvimento comercial</p>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-800 mb-2">Coordenação Regional</h4>
          <p class="text-gray-600 mb-3">Coordena as atividades comerciais em suas respectivas regiões de atuação.</p>
          <div class="text-sm text-gray-500">
            <p>• Gestão territorial de vendas</p>
            <p>• Relacionamento com clientes regionais</p>
            <p>• Análise de mercado local</p>
          </div>
        </div>
      </div>
    `
  },
  "vendas": {
    title: "Processo de Vendas Polar",
    content: `
      <p class="text-lg mb-6 text-gray-700">Nosso processo de vendas é estruturado para garantir a melhor experiência ao cliente e maximizar as oportunidades de negócio.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-blue-800 mb-3">1. Prospecção</h4>
          <p class="text-blue-700 mb-3">Identificação e qualificação de potenciais clientes no mercado de construção civil.</p>
          <ul class="text-sm text-blue-600 space-y-1">
            <li>• Pesquisa de mercado e identificação de oportunidades</li>
            <li>• Análise do perfil do cliente e necessidades</li>
            <li>• Primeiro contato e apresentação da empresa</li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-green-800 mb-3">2. Apresentação</h4>
          <p class="text-green-700 mb-3">Demonstração das soluções e produtos mais adequados para cada cliente.</p>
          <ul class="text-sm text-green-600 space-y-1">
            <li>• Apresentação do portfólio de produtos</li>
            <li>• Demonstração técnica das soluções</li>
            <li>• Elaboração de propostas customizadas</li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-orange-800 mb-3">3. Negociação</h4>
          <p class="text-orange-700 mb-3">Discussão de condições comerciais e ajustes da proposta conforme necessário.</p>
          <ul class="text-sm text-orange-600 space-y-1">
            <li>• Negociação de preços e condições</li>
            <li>• Definição de prazos de entrega</li>
            <li>• Aprovação de crédito e condições de pagamento</li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-purple-800 mb-3">4. Fechamento</h4>
          <p class="text-purple-700 mb-3">Conclusão da venda e início do processo de entrega e acompanhamento.</p>
          <ul class="text-sm text-purple-600 space-y-1">
            <li>• Assinatura do contrato de fornecimento</li>
            <li>• Programação de entregas</li>
            <li>• Acompanhamento pós-venda e suporte técnico</li>
          </ul>
        </div>
      </div>
    `
  },
  "consultores": {
    title: "Conheça nossos consultores",
    content: `
      <p class="text-lg mb-6 text-gray-700">Nossos consultores são excelentes e conhecem todo o nosso portfolio. Veja quem são por região:</p>
    `
  }
};

const ArticleContent = ({ topic }: ArticleContentProps) => {
  const article = articleData[topic] || {
    title: topic,
    content: `
      <p class="text-lg mb-6 text-gray-700">Conteúdo detalhado sobre ${topic} em desenvolvimento.</p>
      <p class="text-gray-600">Esta seção conterá informações específicas sobre ${topic}, incluindo procedimentos, diretrizes e recursos relevantes para a equipe comercial.</p>
      <p class="text-red-500">NÃO CONFIGURADO</p>
    `
  };

  return (
    <article className="bg-white">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>Última atualização: Junho 2025</span>
        </div>
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default ArticleContent;
