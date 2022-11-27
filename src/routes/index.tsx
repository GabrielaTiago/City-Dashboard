import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  Dashboard, 
  ListCities 
} from '../pages';
import { useDrawerContext } from '../shared/contexts';

export default function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/',
        label: 'Página Inicial'
      },
      {
        icon: 'apartment',
        path: '/cidades',
        label: 'Cidades'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/cidades' element={<ListCities />} />
      {/* <Route path='/cities/detail/:id' element={<Dashboard />} /> */}

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
