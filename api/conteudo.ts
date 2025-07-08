// api/conteudo.ts
import fs from 'fs';
import path from 'path';

const conteudoPath = path.join(process.cwd(), 'data', 'conteudo.json');

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const fileData = fs.readFileSync(conteudoPath, 'utf-8');
      return res.status(200).json(JSON.parse(fileData));
    } catch (e) {
      return res.status(500).json({ erro: 'Erro ao ler o conteúdo.' });
    }
  }

  if (req.method === 'POST') {
    try {
      const novoConteudo = req.body;
      if (typeof novoConteudo !== 'object' || Array.isArray(novoConteudo)) {
        return res.status(400).json({ erro: 'Formato inválido.' });
      }
      fs.writeFileSync(conteudoPath, JSON.stringify(novoConteudo, null, 2), 'utf-8');
      return res.status(200).json({ sucesso: true });
    } catch (e) {
      return res.status(500).json({ erro: 'Erro ao salvar o conteúdo.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} não permitido`);
}
