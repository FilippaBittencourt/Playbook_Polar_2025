import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useConteudo } from '@/context/ConteudoContext';
import { ContentItem } from '@/services/contentService';


interface SidebarProps {
  isOpen: boolean;
  handleTopicSelect: (topic: string) => void;
}

const Sidebar = ({ isOpen, handleTopicSelect }: SidebarProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { conteudo } = useConteudo();

  const menu: ContentItem[] = Object.values(conteudo);

  const toggleGroup = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // agrupa dad → filhos
  const roots = menu.filter(item => !item.dad);
  const childrenMap: Record<string, ContentItem[]> = {};
  menu.forEach(item => {
    if (item.dad) {
      if (!childrenMap[item.dad]) childrenMap[item.dad] = [];
      childrenMap[item.dad].push(item);
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
            <li key={item.key}>
              {childrenMap[item.key] ? (
                <>
                  <button
                    onClick={() => toggleGroup(item.key)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors"
                    type="button"
                  >
                    <span className="font-medium">
                      {idx + 1}. {item.title || item.key}
                    </span>
                    {expanded.includes(item.key) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expanded.includes(item.key) && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {childrenMap[item.key].map((sub, subIdx) => (
                        <li key={sub.key}>
                          <button
                            onClick={() => handleTopicSelect(sub.key)}
                            className="w-full text-left p-2 pl-4 rounded hover:bg-blue-700/50 text-blue-100 text-sm transition-colors"
                            type="button"
                          >
                            {idx + 1}.{subIdx + 1} {sub.title || sub.key}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleTopicSelect(item.key)}
                  className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  <span className="font-medium">
                    {idx + 1}. {item.title || item.key}
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
