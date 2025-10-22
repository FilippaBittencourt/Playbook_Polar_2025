import * as React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useConteudo } from "@/context/ConteudoContext";
import { ContentItem } from "@/services/contentService";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  handleTopicSelect: (topic: string) => void;
  onClose: () => void;
}

const Sidebar = ({ isOpen, handleTopicSelect, onClose }: SidebarProps) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { conteudo } = useConteudo();
  const isMobile = useIsMobile();

  const menu: ContentItem[] = Object.values(conteudo);

  const toggleGroup = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const roots = menu.filter(item => !item.dad);
  const childrenMap: Record<string, ContentItem[]> = {};
  menu.forEach(item => {
    if (item.dad) {
      if (!childrenMap[item.dad]) childrenMap[item.dad] = [];
      childrenMap[item.dad].push(item);
    }
  });

  const handleSelect = (topic: string) => {
    handleTopicSelect(topic);
    onClose(); 
  };

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;

    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      (body.style as any).touchAction = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      (body.style as any).touchAction = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      (body.style as any).touchAction = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* OVERLAY (mantém só no mobile; se quiser no desktop também, remova `md:hidden`) */}
      <div
        className={`
          fixed left-0 right-0 top-16 bottom-0 bg-black/50
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          z-40 md:hidden
        `}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-16
          h-[calc(100dvh-4rem)] bg-blue-800 text-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-72 md:w-80
          overflow-y-auto overscroll-contain
          z-50 md:z-40
        `}
      >
        <nav className="p-3 md:p-4">
          <ul className="space-y-1.5 md:space-y-2">
            {roots.map((item, idx) => (
              <li key={item.key}>
                {childrenMap[item.key] ? (
                  <>
                    <button
                      onClick={() => toggleGroup(item.key)}
                      className="w-full flex items-center justify-between p-2.5 md:p-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
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
                      <ul className="ml-3 md:ml-4 mt-1 md:mt-2 space-y-1">
                        {childrenMap[item.key].map((sub, subIdx) => (
                          <li key={sub.key}>
                            <button
                              onClick={() => handleSelect(sub.key)}
                              className="w-full text-left p-2 pl-3 md:pl-4 rounded hover:bg-blue-700/50 text-blue-100 text-xs md:text-sm transition-colors"
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
                    onClick={() => handleSelect(item.key)}
                    className="w-full text-left p-2.5 md:p-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
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
    </>
  );
};

export default Sidebar;
