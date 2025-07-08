// src/components/Sidebar.tsx
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useConteudo, MenuItem } from '@/context/ConteudoContext';

interface SidebarProps {
  isOpen: boolean;
  handleTopicSelect: (topic: string) => void;
}

const Sidebar = ({ isOpen, handleTopicSelect }: SidebarProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { menu } = useConteudo();

  const toggleGroup = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // agrupa pai→filhos
  const roots = menu.filter(item => !item.pai);
  const childrenMap: Record<string, MenuItem[]> = {};
  menu.forEach(item => {
    if (item.pai) {
      childrenMap[item.pai] = childrenMap[item.pai] || [];
      childrenMap[item.pai].push(item);
    }
  });

  return (
    <aside
      className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-blue-800 text-white
        transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 overflow-y-auto
      `}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {roots.map((item, idx) => (
            <li key={item.chave}>
              {childrenMap[item.chave] ? (
                <>
                  <button
                    onClick={() => toggleGroup(item.chave)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span className="font-medium">
                      {idx + 1}. {item.titulo}
                    </span>
                    {expanded.includes(item.chave) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expanded.includes(item.chave) && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {childrenMap[item.chave].map((sub, subIdx) => (
                        <li key={sub.chave}>
                          <button
                            onClick={() => handleTopicSelect(sub.chave)}
                            className="w-full text-left p-2 pl-4 rounded hover:bg-blue-700/50 text-blue-100 text-sm transition-colors"
                          >
                            {idx + 1}.{subIdx + 1} {sub.titulo}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleTopicSelect(item.chave)}
                  className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="font-medium">
                    {idx + 1}. {item.titulo}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
