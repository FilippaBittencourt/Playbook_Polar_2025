export const usuarios = [
  { login: 'ana', senha: 'senha123' },
  { login: 'bruno', senha: 'polar2025' },
  { login: 'admin', senha: 'admin123' },
  { login: 'lippa', senha: 'nini123'}
];

export function encontrarUsuario(login, senha) {
  return usuarios.find((u) => u.login === login && u.senha === senha);
}