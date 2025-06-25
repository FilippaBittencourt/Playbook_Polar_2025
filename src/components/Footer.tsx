import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Sobre</h3>
            <div className="space-y-1 text-gray-300">
              <p>© 2025 Polar Comercial</p>
              <p>Playbook Comercial desenvolvido para uso interno</p>
              <p>Última atualização: Junho 2025</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Redes Sociais</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contato (sem link) */}
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Dúvidas ou sugestões?</h3>
            <p className="text-gray-300 italic">filippa.bittencourt@ambar.tech</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-3 text-center text-gray-400 text-sm">
          <p>Polar - Componentes Tecnológicos para Construção Civil</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
