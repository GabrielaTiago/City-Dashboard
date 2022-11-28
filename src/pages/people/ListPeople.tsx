import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';
import { TableOfPeople } from './components/Table';
import { usePeopleContext } from '../../shared/contexts';

export function ListPeople(): JSX.Element {
  const delay: number = 500;
  const { debounce } = useDebounce(delay, true);
  const [searchParams, setSearchParams] = useSearchParams();

  const { setRows } = usePeopleContext();
  
  const person = useMemo(() => {
    return searchParams.get('person') || '';
  }, [searchParams]);

  useEffect(() => {

    debounce(() => {
      PeopleService.getAll(1, person)
        .then((res) => {

          if(res instanceof Error) {
            alert(res.message);
            return;
          } else {
            setRows(res.data);
          }
        });
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
      <TableOfPeople />
   </LayoutPageBase>
  );
}
