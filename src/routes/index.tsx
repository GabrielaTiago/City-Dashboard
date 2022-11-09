import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useThemeContext } from '../shared/contexts';

export default function AppRoutes() {
  const { toggleTheme } = useThemeContext();
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Button variant='contained' color='primary' onClick={toggleTheme}>
            oi
          </Button>
        }
      />

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
