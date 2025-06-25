// api/logout.js
export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'usuario=; Max-Age=0; Path=/; HttpOnly');
  return res.status(200).json({ sucesso: true });
}
