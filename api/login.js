import { usuarios } from './usuarios.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { login, senha } = req.body;

  const usuario = usuarios.find(
    (u) => u.login === login && u.senha === senha
  );

  if (usuario) {
    const isProd = process.env.NODE_ENV === 'production';

    // Cookie de sessão (expira ao fechar o navegador)
    res.setHeader('Set-Cookie', [
      `usuario=${encodeURIComponent(usuario.login)}; Path=/; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}`
    ]);

    return res.status(200).json({ sucesso: true });
  }

  return res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos' });
}
