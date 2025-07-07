// api/verificar-admin.js
export default function handler(req, res) {
  const cookie = req.headers.cookie || '';

  const usuarioCookie = cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('usuario='));

  if (usuarioCookie) {
    const usuario = decodeURIComponent(usuarioCookie.split('=')[1]);
    if (usuario === 'admin') {
      return res.status(200).json({ admin: true });
    }
  }

  return res.status(403).json({ admin: false, mensagem: 'Acesso negado' });
}
