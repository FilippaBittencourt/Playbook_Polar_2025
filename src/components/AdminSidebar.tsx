import { useState } from 'react';

interface SidebarProps {
  selecao: string;
  onSelect: (secao: string) => void;
}

const AdminSidebar = ({ selecao, onSelect }: SidebarProps) => {
  const [aberto, setAberto] = useState<string | null>(null);

  const toggleGrupo = (grupo: string) => {
    setAberto(aberto === grupo ? null : grupo);
  };

  return (
    <aside className="w-72 bg-white border-r p-4 text-[15px] text-gray-800">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Seções</h2>
      <ul className="space-y-1.5">
        <li>
          <button onClick={() => onSelect('home')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            1. Home
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('sobre')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'sobre' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            2. Quem somos?
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('liderança')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'liderança' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            3. Liderança
          </button>
        </li>
        <li>
          <button onClick={() => toggleGrupo('time')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-900">
            4. Time comercial {aberto === 'time' ? '▾' : '▸'}
          </button>
          {aberto === 'time' && (
            <ul className="ml-4 mt-1 space-y-1.5">
              <li>
                <button onClick={() => onSelect('consultores')} className={`w-full text-left px-3 py-1.5 rounded ${selecao === 'consultores' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                  4.1 Nossos consultores
                </button>
              </li>
              <li>
                <button onClick={() => onSelect('regiões')} className={`w-full text-left px-3 py-1.5 rounded ${selecao === 'regiões' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                  4.2 Regiões atendidas
                </button>
              </li>
              <li>
                <button onClick={() => onSelect('comercial')} className={`w-full text-left px-3 py-1.5 rounded ${selecao === 'comercial' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                  4.3 Canais e construção
                </button>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleGrupo('portfolio')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-900">
            5. Portfólio {aberto === 'portfolio' ? '▾' : '▸'}
          </button>
          {aberto === 'portfolio' && (
            <ul className="ml-4 mt-1 space-y-1.5">
              <li>
                <button onClick={() => onSelect('métodos')} className={`w-full text-left px-3 py-1.5 rounded ${selecao === 'métodos' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                  5.1 Métodos construtivos
                </button>
              </li>
              <li>
                <button onClick={() => onSelect('produtos')} className={`w-full text-left px-3 py-1.5 rounded ${selecao === 'produtos' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                  5.2 Principais produtos
                </button>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => onSelect('ferramentas')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'ferramentas' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            6. Ferramentas
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('vendas')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'vendas' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            7. Processo de vendas
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('indicadores')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'indicadores' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            8. Indicadores e metas
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('politicas')} className={`w-full text-left px-3 py-2.5 rounded font-medium ${selecao === 'politicas' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            9. Política comercial
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
