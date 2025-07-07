import { useState } from 'react';
import { useConteudo } from '@/context/ConteudoContext';

interface SidebarProps {
  selecao: string;
  onSelect: (secao: string) => void;
}

const AdminSidebar = ({ selecao, onSelect }: SidebarProps) => {
  const [aberto, setAberto] = useState<string | null>(null);
  const { estruturaMenu } = useConteudo();

  const toggleGrupo = (grupo: string) => {
    setAberto(aberto === grupo ? null : grupo);
  };

  // Agrupar seções principais e subseções
  const seçõesAgrupadas = estruturaMenu.reduce<Record<string, { chave: string; titulo: string; pai?: string }[]>>((acc, item) => {
    const pai = item.pai || '__raiz__';
    if (!acc[pai]) acc[pai] = [];
    acc[pai].push(item);
    return acc;
  }, {});

  const principais = seçõesAgrupadas['__raiz__'] || [];

  return (
    <aside className="w-72 bg-white border-r p-4 text-[15px] text-gray-800">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Seções</h2>
      <ul className="space-y-1.5">
        {principais.map((item, index) => (
          <li key={item.chave}>
            {seçõesAgrupadas[item.chave] ? (
              <>
                <button
                  onClick={() => toggleGrupo(item.chave)}
                  className="w-full text-left px-3 py-2.5 font-semibold text-gray-900"
                >
                  {index + 1}. {item.titulo} {aberto === item.chave ? '▾' : '▸'}
                </button>
                {aberto === item.chave && (
                  <ul className="ml-4 mt-1 space-y-1.5">
                    {seçõesAgrupadas[item.chave].map((subitem, idx) => (
                      <li key={subitem.chave}>
                        <button
                          onClick={() => onSelect(subitem.chave)}
                          className={`w-full text-left px-3 py-1.5 rounded ${
                            selecao === subitem.chave ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}.{idx + 1} {subitem.titulo}
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
                  selecao === item.chave ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}. {item.titulo}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
