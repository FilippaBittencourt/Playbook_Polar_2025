export default function handler(req, res) {
  const cookie = req.headers.cookie || '';

  const usuarioCookie = cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('usuario='));

  if (usuarioCookie) {
    const usuario = decodeURIComponent(usuarioCookie.split('=')[1]);

    // Lista de usuários válidos
    const usuariosValidos = ['ana', 'bruno', 'admin', 'lippa'];

    // Verifica se o valor do cookie é um usuário válido
    if (usuariosValidos.includes(usuario)) {
      return res.status(200).json({ autenticado: true, usuario });
    }
  }

  return res.status(200).json({ autenticado: false });
}
