import { useEffect } from 'react';
import { SearchBar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';
import { TableOfPeople } from './components/Table';
import { usePeopleContext } from '../../shared/contexts';

export function ListPeople(): JSX.Element {
  const delay: number = 500;
  const { debounce } = useDebounce(delay, true);
  const { setRows, setIsLoading } = usePeopleContext();
  const { person, setSearchParams } = usePeopleContext();
  
  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(1, person)
        .then((res) => {
          setIsLoading(false);

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
