import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {/* Sobre */}
          <div className="text-left md:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-blue-300">
              Sobre
            </h3>
            <div className="space-y-1 text-gray-300">
              <p>© 2025 Polar</p>
              <p>Playbook Comercial desenvolvido para uso interno</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="text-left md:text-center">
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-blue-300">
              Redes Sociais
            </h3>
            <div className="flex justify-start md:justify-center space-x-3 md:space-x-4">
              <a
                href="https://www.facebook.com/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 md:p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="https://www.instagram.com/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 md:p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/polarcomponentes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 md:p-3 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          {/* Contato (com link mailto) */}
          <div className="text-left md:text-right">
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-blue-300">
              Dúvidas ou sugestões?
            </h3>
            <a
              href="mailto:filippa.bittencourt@ambar.tech"
              className="text-gray-300 italic hover:underline"
            >
              filippa.bittencourt@ambar.tech
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-3 pt-2 md:mt-4 md:pt-3 text-center text-gray-400 text-sm">
          <p>Polar Componentes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
