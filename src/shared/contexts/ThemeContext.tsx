import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { LightTheme, DarkTheme } from '../themes';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

type ChildrenProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext({} as IThemeContextData);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export function AppThemeProvider({ children }: ChildrenProps) {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={DarkTheme}>
        <Box
          width={'100vw'}
          height={'100vh'}
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
