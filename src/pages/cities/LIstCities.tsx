import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../shared/components';
import { LayoutPageBase } from '../../shared/layouts';

export function ListCities(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = useMemo(() => {
    return searchParams.get('city') || '';
  }, [searchParams]);

  return (
   <LayoutPageBase 
     title='Lista de Cidades'
     taskBar={
      <SearchBar
        buttonText='Nova'
        searchInput
        searchText={city}
        onChangeSearchText={(text) => setSearchParams({ city: text }, { replace: true })}
      />
     }
    >

   </LayoutPageBase>
  );
}
