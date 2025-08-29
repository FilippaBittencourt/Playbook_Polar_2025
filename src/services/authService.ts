import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type LoginResponse = {
  success: boolean;
  message?: string;
  user?: any;
};

// Pegue as chaves do .env
const USER_KEY = import.meta.env.VITE_USER_KEY!;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY!;

/**
 * Login de usuário
 */
export const loginUser = async (
  login: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("login", login)
      .single();

    if (error || !data) {
      return { success: false, message: "Usuário não encontrado." };
    }

    if (data.password !== password) {
      return { success: false, message: "Senha incorreta." };
    }

    // Define cookie conforme tipo de usuário
    const chave = login === "admin" ? ADMIN_KEY : USER_KEY;
    document.cookie = `chaveSecreta=${encodeURIComponent(
      chave
    )}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24 * 7}`;

    return { success: true, user: data };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro ao autenticar." };
  }
};

/**
 * Valida se o usuário está logado
 * Retorna:
 * - { isLogged: true, isAdmin: boolean } se houver cookie válido
 * - { isLogged: false } se não houver
 */
export const validarLogin = () => {
  const match = document.cookie.match(/(^| )chaveSecreta=([^;]+)/);
  if (!match) return { isLogged: false };

  const chave = decodeURIComponent(match[2]);
  if (chave === ADMIN_KEY) return { isLogged: true, isAdmin: true };
  if (chave === USER_KEY) return { isLogged: true, isAdmin: false };

  return { isLogged: false };
};

/**
 * Desloga o usuário removendo o cookie
 */
export const logoutUser = () => {
  document.cookie = `chaveSecreta=; path=/; secure; samesite=strict; max-age=0`;
};
