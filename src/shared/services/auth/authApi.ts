import { instance } from "../config";

interface IAuth {
    accessToken: string;
}

export async function auth(email: string, password: string): Promise<IAuth | Error> {
  try {
    const { data } = await instance.get('/auth', { data: { email, password } });

    if(data) {
      return data; 
    }

    return new Error('Erro no login.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro no login.');
  } 
}

export const AuthService = { auth };