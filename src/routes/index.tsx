import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export default function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

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
      <Route path='/' element={<Dashboard />} />

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
