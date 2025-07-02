
interface ArticleContentProps {
  topic: string;
}

const articleData: { [key: string]: any } = {
  "home": {
    title: "Bem-vindo ao Playbook Comercial da Polar",
    content: `
      <p class="text-lg mb-6 text-gray-700">Este é o centro de conhecimento comercial da Polar, sua fonte definitiva para informações sobre produtos, práticas, processos e diretrizes comerciais.</p>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-800 mb-3">O que você encontrará aqui:</h3>
        <ul class="space-y-2 text-blue-700">
          <li>• Estrutura organizacional e processos comerciais</li>
          <li>• Equipe comercial e regiões atendidas </li>
          <li>• Portfólio de produtos e soluções</li>
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
    title: "Conheça a Polar",
    content: `
      <p class="text-lg mb-6 text-gray-700">A Polar é uma das três unidades de negócio da Ambar Tech e atua há mais de 30 anos no mercado da construção civil, oferecendo componentes tecnológicos inovadores e de alta qualidade. Presente em obras de grandes construtoras e instaladoras no Brasil e em outros países, a Polar se consolidou como referência em soluções para infraestrutura elétrica, hidráulica, climatização e acessórios.</p>

      <p class="text-lg mb-6 text-gray-700">Com ampla experiência e profundo conhecimento técnico, a Polar desenvolveu sistemas que aumentam a produtividade da mão de obra, reduzem falhas na execução e geram economia nas etapas de instalação. Dessa forma, contribui para obras mais eficientes, com alto padrão de qualidade e confiabilidade.
      </p>
      
      <h3 class="text-xl font-semibold mb-4 text-gray-800">Nossa Missão</h3>
      <p class="mb-6 text-gray-700">
      Fornecer componentes tecnológicos de excelência para a construção civil, contribuindo para o desenvolvimento de obras mais eficientes, sustentáveis e duradouras. Nosso compromisso é com soluções inteligentes que descomplicam o dia a dia da construção: <em class="italic">construindo o simples</em>.
      </p>
      
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
      <p class="text-lg mb-6 text-gray-700">Conheça a liderança da Polar e os principais responsáveis pela direção estratégica da empresa.</p>
      
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
  "comercial": {
  title: "Time Comercial",
  content: `
    <p class="text-lg mb-6 text-gray-700">O time comercial da Polar é formado por profissionais que atuam em campo, em contato direto com construtoras e instaladoras de todo o país. Nossa estrutura foi desenhada para garantir cobertura nacional com agilidade, conhecimento técnico e proximidade. Essa estrutura permite um acompanhamento personalizado de cada cliente, com soluções adaptadas à  realidade local e alinhadas às diretrizes da Polar.</p>

    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
      <h3 class="text-xl font-semibold text-blue-800 mb-3">O que você encontrará nesta seção:</h3>
      <ul class="space-y-2 text-blue-700">
        <li>• Conheça os consultores que representam a Polar nas diferentes regiões</li>
        <li>• Visualize como é feita a divisão de territórios e estados atendidos</li>
        <li>• Entenda as diferenças entre o time de canais e o time de construção</li>
      </ul>
    </div>
    `
  },
  "consultores": {
    title: "Nossos Consultores",
    content: `
      <p class="text-lg mb-6 text-gray-700">Conheça a nossa equipe de consultores, formada por profissionais dedicados, especializados em atender clientes com excelência em diferentes regiões do Brasil.</p>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
    <img 
      src="/consultores/felipe-fabres.jpg" 
      alt="Foto de Felipe Fabres" 
      class="w-32 h-32 mx-auto rounded-full mb-4 object-cover shadow-md"
    />
    <h4 class="text-lg font-semibold text-gray-800">Felipe Fabres</h4>
    <p class="text-sm text-gray-500 mb-2">Região SPI 02</p>
    <p class="text-sm text-gray-600 mb-1">Especialista em climatização</p>
    <a href="mailto:felipe.fabres@ambar.tech" class="text-blue-600 hover:underline text-sm">
      felipe.fabres@ambar.tech
    </a>
    <div class="mt-3 flex justify-center space-x-4">
      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" aria-label="WhatsApp">
        <img src="/icons/whatsapp.svg" class="w-5 h-5" alt="WhatsApp" />
      </a>
      <a href="https://linkedin.com/in/felipefabres" target="_blank" rel="noopener" aria-label="LinkedIn">
        <img src="/icons/linkedin.svg" class="w-5 h-5" alt="LinkedIn" />
      </a>
    </div>
  </div>
  <!-- Repita para outros consultores -->
</div>
      
    `
  },
  "regiões": {
    title: "Regiões",
    content: `
      <p class="text-lg mb-6 text-gray-700">Nossos consultores são responsáveis por representar a Polar em campo, oferecendo suporte técnico e comercial às construtoras e instaladoras em cada região do Brasil. Cada profissional atua em uma área específica, garantindo atendimento personalizado e profundo conhecimento das necessidades locais.</p>

      <p class="text-lg mb-6 text-gray-700">Confira abaixo o mapa com a divisão dos territórios atendidos, seguido por uma tabela com os estados, regiões comerciais e os consultores responsáveis. Essa organização garante cobertura eficiente em todo o Brasil, com atendimento próximo e especializado.</p>

      <div class="flex justify-center mb-8">
      <img 
        src="/mapa.png" 
        alt="Mapa das regiões atendidas" 
        class="w-[600px] max-w-full h-auto rounded-lg shadow-md"
      />
    </div>

    <h3 class="text-xl font-semibold mb-4 text-gray-800">Divisão Territorial</h3>

    <div class="overflow-x-auto mb-8">
      <table class="min-w-full text-left border border-gray-300">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="px-4 py-2 border-b">Estados</th>
            <th class="px-4 py-2 border-b">Região Polar</th>
            <th class="px-4 py-2 border-b">Consultor Externo</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr><td class="px-4 py-2 border-b">SPC1</td><td class="px-4 py-2 border-b">REG 01 - SPC 01</td><td class="px-4 py-2 border-b">VAGO</td></tr>
          <tr><td class="px-4 py-2 border-b">SPI2</td><td class="px-4 py-2 border-b">REG 02 - SPI 02</td><td class="px-4 py-2 border-b">Felipe Fabres</td></tr>
          <tr><td class="px-4 py-2 border-b">SPC3</td><td class="px-4 py-2 border-b">REG 03 - SPC 03</td><td class="px-4 py-2 border-b">Heraldo Almeida</td></tr>
          <tr><td class="px-4 py-2 border-b">PR</td><td class="px-4 py-2 border-b">REG 04 - SUL 01</td><td class="px-4 py-2 border-b">Waldir Oliveira</td></tr>
          <tr><td class="px-4 py-2 border-b">RS</td><td class="px-4 py-2 border-b">REG 05 - SUL 02</td><td class="px-4 py-2 border-b">Gustavo Lanzarini</td></tr>
          <tr><td class="px-4 py-2 border-b">MG</td><td class="px-4 py-2 border-b">REG 06 - MG</td><td class="px-4 py-2 border-b">Edson Coura</td></tr>
          <tr><td class="px-4 py-2 border-b">ES-RJ</td><td class="px-4 py-2 border-b">REG 07 - RJ</td><td class="px-4 py-2 border-b">VAGO</td></tr>
          <tr><td class="px-4 py-2 border-b">AL-PB-PE-SE</td><td class="px-4 py-2 border-b">REG 08 - NE1</td><td class="px-4 py-2 border-b">Robertt Amorim</td></tr>
          <tr><td class="px-4 py-2 border-b">CE-PI-RN-TO</td><td class="px-4 py-2 border-b">REG 09 - NE2</td><td class="px-4 py-2 border-b">Rafael Xerez</td></tr>
          <tr><td class="px-4 py-2 border-b">DF-GO</td><td class="px-4 py-2 border-b">REG 10 - CO</td><td class="px-4 py-2 border-b">Gabriel Naum</td></tr>
          <tr><td class="px-4 py-2 border-b">SPI3</td><td class="px-4 py-2 border-b">REG 11 - SPI 03</td><td class="px-4 py-2 border-b">VAGO</td></tr>
          <tr><td class="px-4 py-2 border-b">MS-MT-RO</td><td class="px-4 py-2 border-b">REG 12 - MS/MT</td><td class="px-4 py-2 border-b">Edilberto Rasche</td></tr>
          <tr><td class="px-4 py-2 border-b">BA</td><td class="px-4 py-2 border-b">REG 13 - BA</td><td class="px-4 py-2 border-b">Pryscilla Pequeno</td></tr>
          <tr><td class="px-4 py-2 border-b">SPI4</td><td class="px-4 py-2 border-b">REG 14 - SPI 04</td><td class="px-4 py-2 border-b">Vitor Vitorello</td></tr>
          <tr><td class="px-4 py-2 border-b">SC</td><td class="px-4 py-2 border-b">REG 15 - SUL 03</td><td class="px-4 py-2 border-b">Priscila Dutra</td></tr>
          <tr><td class="px-4 py-2 border-b">AC-RR-AM</td><td class="px-4 py-2 border-b">REG 16 - N1</td><td class="px-4 py-2 border-b">Caio Pacheco</td></tr>
          <tr><td class="px-4 py-2 border-b">MA-PA-AP</td><td class="px-4 py-2 border-b">REG 17 - N2</td><td class="px-4 py-2 border-b">João Araújo</td></tr>
          <tr><td class="px-4 py-2 border-b">SP VALE</td><td class="px-4 py-2 border-b">REG 18 - SPI VALE</td><td class="px-4 py-2 border-b">Luis Gustavo Santos</td></tr>
        </tbody>
      </table>
    </div>

    <p class="mb-6 text-gray-700">O estado de São Paulo, devido à sua extensão territorial e alta concentração de obras, foi segmentado em diversas regiões comerciais para otimizar o atendimento. Essas regiões são classificadas como <strong>SPC</strong> (São Paulo Capital) e <strong>SPI</strong> (São Paulo Interior), e cada uma conta com um consultor responsável por uma área específica. Essa divisão permite maior proximidade com os clientes e um suporte mais ágil e personalizado.</p>
    
    <p class="mb-6 text-gray-700">Para visualizar a divisão completa e detalhes de cada região, <a href="https://docs.google.com/spreadsheets/d/1YDqEb4LRP3M6YOlXrUkHdSlnUS5i1AKN/edit?gid=393594404#gid=393594404" class="text-blue-600 hover:underline" target="_blank">acesse este link</a>.</p>
    `
  },
  "métodos": {
    title: "Métodos Construtivos",
    content: `
    <p class="text-lg mb-6 text-gray-700">A atuação da Polar contempla diferentes métodos construtivos adotados pelo mercado. Nesta seção, apresentamos um panorama dos principais sistemas aplicados nas construções atendidas.</p>

      <p class="mb-6 text-gray-700">

  <div>
    <h3 class="text-xl font-semibold  mb-4 text-gray-800">Parede de Concreto</h3>
    <p class="mb-6 text-gray-700">Método que utiliza formas para moldar, no próprio local da obra, paredes estruturais em concreto armado. Garante agilidade na execução, padronização e alto desempenho em estanqueidade e resistência.</p>
      <div class="flex justify-center mb-8">
        <img 
          src="/concreto.png" 
          alt="Obra em parede de concreto"
          class="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
        />
      </div>
  </div>

  <div>
    <h3 class="text-xl font-semibold  mb-4 text-gray-800">Alvenaria Estrutural</h3>
    <p class="mb-6 text-gray-700">A alvenaria estrutural é um conceito de sistema construtivo, onde toda alvenaria está envolvida diretamente na sustentação de uma obra. Refere-se de um processo construtivo, no qual as paredes têm função estrutural, ou seja, são autoportantes. Dessa forma, fica encarregada da transmissão das cargas até a fundação.</p>
    <div class="flex justify-center mb-8">
        <img 
          src="/estrutural.png" 
          alt="Obra em alvenaria estrutural"
          class="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
        />
      </div>
  </div>

  <div>
    <h3 class="text-xl font-semibold  mb-4 text-gray-800">Alvenaria de Vedação</h3>
    <p class="mb-6 text-gray-700">A alvenaria de vedação tem a finalidade exclusiva de fechar o espaço compreendido entre vigas e pilares de uma estrutura de concreto armado. É o método construtivo mais utilizado para vedar e separar ambientes de casas e edifícios no Brasil, sendo composta por blocos cerâmicos ou blocos de concreto sobrepostos com o uso de argamassa (mistura de água, cimento e areia).</p>
    <div class="flex justify-center mb-8">
        <img 
          src="/vedacao.png" 
          alt="Obra em alvenaria de vedação"
          class="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
        />
      </div>
  </div>

  <div>
    <h3 class="text-xl font-semibold  mb-4 text-gray-800">Drywall</h3>
    <p class="mb-6 text-gray-700">Drywall é o sistema para construção de paredes e forros, assim, dispensando os métodos convencionais das construções de alvenaria. Combina estruturas de aço galvanizado com chapas de gesso de alta resistência mecânica e acústica, não necessitando de argamassa. Este sistema geralmente é aplicado no Brasil, em conjunto com os sistemas apresentados nos slides anteriores, como divisão de cômodos internos.</p>
   </div>
    <div class="flex justify-center mb-8">
        <img 
          src="/drywall.png" 
          alt="Obra em drywall"
          class="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
        />
      </div>
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
