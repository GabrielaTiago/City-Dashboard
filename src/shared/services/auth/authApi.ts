import { instance } from "../config";

interface IAuth {
    accessToken: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export async function signIn(body: ILoginData): Promise<IAuth | Error> {
  try {
    const { data } = await instance.get('/auth', { data: body });

    if(data) {
      return data; 
    }

    return new Error('Erro no login.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro no login.');
  } 
}

export const AuthService = { signIn };