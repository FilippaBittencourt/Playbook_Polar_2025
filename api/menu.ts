// api/menu.ts
import fs from 'fs';
import path from 'path';

const menuPath = path.join(process.cwd(), 'data', 'menu.json');

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const raw = fs.readFileSync(menuPath, 'utf-8');
      return res.status(200).json(JSON.parse(raw));
    } catch {
      return res.status(500).json({ erro: 'Não foi possível ler o menu.' });
    }
  }

  if (req.method === 'POST') {
    try {
      const novoMenu = req.body;
      if (!Array.isArray(novoMenu)) {
        return res.status(400).json({ erro: 'Formato inválido.' });
      }
      fs.writeFileSync(menuPath, JSON.stringify(novoMenu, null, 2), 'utf-8');
      return res.status(200).json({ sucesso: true });
    } catch {
      return res.status(500).json({ erro: 'Não foi possível salvar o menu.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} não permitido`);
}
