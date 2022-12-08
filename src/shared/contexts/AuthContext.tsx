import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/auth/authApi';
import { TChildrenProps } from '../types';

interface IAuthContextData {
  isAuthenticaded: boolean;
  login: (email: string, password: string) => Promise<string | void>
  logout: () => void;
};

const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: TChildrenProps) {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if(result instanceof Error){
      return result.message;
    } else {
      localStorage.setItem('APP_ACCESS_TOKEN', JSON.stringify(result.accessToken));
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_ACCESS_TOKEN');
    setAccessToken(undefined);
  }, []);

  const isAuthenticaded = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticaded, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
