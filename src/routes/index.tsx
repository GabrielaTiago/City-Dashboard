import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useThemeContext, useDrawerContext } from '../shared/contexts';

export default function AppRoutes() {
  const { toggleTheme } = useThemeContext();
  const { toggleDrawer } = useDrawerContext();

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
