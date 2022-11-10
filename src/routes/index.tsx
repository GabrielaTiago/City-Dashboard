import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useThemeContext, useDrawerContext } from '../shared/contexts';

export default function AppRoutes() {
  const { toggleTheme } = useThemeContext();
  const { toggleDrawer, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/',
        label: 'Página Inicial'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Button variant='contained' color='primary' onClick={toggleTheme}>
              Tema claro/escruro
            </Button>
            <Button variant='contained' color='secondary' onClick={toggleDrawer}>
              Barra Lateral
            </Button>
          </>
        }
      />

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
