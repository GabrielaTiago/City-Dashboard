
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../shared/components';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';

export function ListPeople(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const person = useMemo(() => {
    return searchParams.get('person') || '';
  }, [searchParams]);

  useEffect(() => {
    PeopleService.getAll(1, person)
      .then((res) => {
        if(res instanceof Error) {
          alert(res.message);
          return;
        }
      });
  },[person]);

  return (
   <LayoutPageBase 
     title='Lista de Pessoas'
     taskBar={
      <SearchBar
        buttonText='Nova'
        searchInput
        searchText={person}
        onChangeSearchText={(text) => setSearchParams({ person: text }, { replace: true })}
      />
     }
    >

   </LayoutPageBase>
  );
}
