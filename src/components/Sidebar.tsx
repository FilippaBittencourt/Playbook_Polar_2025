
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';


interface MenuItem {
  id: string;
  title: string;
  subcategories?: {
    id: string,
    title: string,
  }[];
}

interface SidebarProps {
  isOpen: boolean;
  handleTopicSelect: (topic: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: '1. Home'
  },
  {
    id: 'sobre',
    title: '2. Quem somos?',
  },
  {
    id: 'liderança',
    title: '3. Liderança',
  },
  {
    id: 'comercial',
    title: '4. Time comercial',
    subcategories:
    [
      {
        id: 'consultores',
        title: '4.1 Nossos consultores',
      },
      {
        id: 'regiões',
        title: '4.2 Regiões atendidas'
      },
      {
        id: 'divisão',
        title: '4.3 Canais e construção'
      }
    ]
  },
  {
    id: 'produtos',
    title: '5. Portfólio',
    subcategories:
    [
      {
        id: 'métodos',
        title: '5.1 Métodos construtivos'
      },
      {
        id: 'principais',
        title: '5.2 Principais produtos'
      }
    ]
  },
  {
    id: 'ferramentas',
    title: '6. Ferramentas',
  },
  {
    id: 'vendas',
    title: '7. Processo de vendas',
  },
  {
    id: 'indicadores',
    title: '8. Indicadores e metas',
  },
  {
    id: 'politicas',
    title: '9. Política comercial'
  }
];

const Sidebar = ({ isOpen, handleTopicSelect }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    handleTopicSelect(itemId)
  };

  const toggleTopic = (itemId: string) => {
    handleTopicSelect(itemId)
  }

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] bg-blue-800 text-white transition-transform duration-300 z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-80 overflow-y-auto
    `}>
      <nav className="p-4">
        
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="font-medium">{item.title}</span>
                {item.subcategories && (
                  expandedItems.includes(item.id) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {item.subcategories && expandedItems.includes(item.id) && (
                <ul className="ml-4 mt-2 space-y-1">
                  {item.subcategories.map((sub, index) => (
                    <li key={index}>
                      <button onClick={() => toggleTopic(sub.id)} className="w-full text-left p-2 pl-4 rounded hover:bg-blue-700/50 text-blue-100 text-sm transition-colors">
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
