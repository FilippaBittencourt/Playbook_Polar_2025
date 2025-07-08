// src/components/AdminSidebar.tsx
import { useState } from 'react';
import { useConteudo, MenuItem } from '@/context/ConteudoContext';

interface SidebarProps {
  selecao: string;
  onSelect: (secao: string) => void;
}

const AdminSidebar = ({ selecao, onSelect }: SidebarProps) => {
  const [aberto, setAberto] = useState<string | null>(null);
  const { menu } = useConteudo();

  const toggleGrupo = (chave: string) =>
    setAberto(aberto === chave ? null : chave);

  // seções de raiz (sem pai)
  const principais = menu.filter((item) => !item.pai);

  return (
    <aside className="w-72 bg-white border-r p-4 text-[15px] text-gray-800">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Seções</h2>
      <ul className="space-y-1.5">
        {principais.map((item, idx) => (
          <li key={item.chave}>
            {/** Se tem filhos, cria grupo */}
            {menu.some((sub) => sub.pai === item.chave) ? (
              <>
                <button
                  onClick={() => toggleGrupo(item.chave)}
                  className="w-full text-left px-3 py-2.5 font-semibold text-gray-900"
                >
                  {idx + 1}. {item.titulo}{' '}
                  {aberto === item.chave ? '▾' : '▸'}
                </button>
                {aberto === item.chave && (
                  <ul className="ml-4 mt-1 space-y-1.5">
                    {menu
                      .filter((sub) => sub.pai === item.chave)
                      .map((sub, sidx) => (
                        <li key={sub.chave}>
                          <button
                            onClick={() => onSelect(sub.chave)}
                            className={`w-full text-left px-3 py-1.5 rounded ${
                              selecao === sub.chave
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {idx + 1}.{sidx + 1} {sub.titulo}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            ) : (
              <button
                onClick={() => onSelect(item.chave)}
                className={`w-full text-left px-3 py-2.5 rounded font-medium ${
                  selecao === item.chave
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {idx + 1}. {item.titulo}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
