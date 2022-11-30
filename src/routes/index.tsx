import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  Dashboard, 
  DetailPeople, 
  ListCities, 
  ListPeople
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
      },
      {
        icon: 'groups',
        path: '/pessoas',
        label: 'Pessoas'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />

      <Route path='/cidades' element={<ListCities />} />
      {/* <Route path='/cidades/detalhe/:id' element={<Dashboard />} /> */}

      <Route path='/pessoas' element={<ListPeople />} />
      <Route path='/pessoas/detalhe/:id' element={<DetailPeople />} />

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
