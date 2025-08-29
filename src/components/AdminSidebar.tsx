// src/components/AdminSidebar.tsx
import { useState } from 'react';

interface ConteudoItem {
  key: string;
  value: string;
  dad?: string | null;
}

interface SidebarProps {
  selecao: string;
  onSelect: (secao: string) => void;
  menu: ConteudoItem[];
  formatarTitulo: (key: string) => string;
}

const AdminSidebar = ({ selecao, onSelect, menu, formatarTitulo }: SidebarProps) => {
  const [aberto, setAberto] = useState<string | null>(null);

  const toggleGrupo = (key: string) =>
    setAberto(aberto === key ? null : key);

  // Seções de raiz (sem dad)
  const princidads = menu.filter((item) => !item.dad);

  return (
    <aside className="w-72 bg-white border-r p-4 text-[15px] text-gray-800">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Seções</h2>
      <ul className="space-y-1.5">
        {princidads.map((item, idx) => (
          <li key={item.key}>
            {/* Se tem filhos, cria grupo */}
            {menu.some((sub) => sub.dad === item.key) ? (
              <>
                <button
                  onClick={() => toggleGrupo(item.key)}
                  className="w-full text-left px-3 py-2.5 font-semibold text-gray-900"
                >
                  {idx + 1}. {formatarTitulo(item.key)}{' '}
                  {aberto === item.key ? '▾' : '▸'}
                </button>
                {aberto === item.key && (
                  <ul className="ml-4 mt-1 space-y-1.5">
                    {menu
                      .filter((sub) => sub.dad === item.key)
                      .map((sub, sidx) => (
                        <li key={sub.key}>
                          <button
                            onClick={() => onSelect(sub.key)}
                            className={`w-full text-left px-3 py-1.5 rounded ${
                              selecao === sub.key
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {idx + 1}.{sidx + 1} {formatarTitulo(sub.key)}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            ) : (
              <button
                onClick={() => onSelect(item.key)}
                className={`w-full text-left px-3 py-2.5 rounded font-medium ${
                  selecao === item.key
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {idx + 1}. {formatarTitulo(item.key)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
