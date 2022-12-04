import { useEffect } from 'react';
import { SearchBar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutPageBase } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/citiesApi';
import { TableOfCities } from './components/Table';
import { useCitiesContext } from '../../shared/contexts';
import { useNavigate } from 'react-router-dom';

export function ListCities(): JSX.Element {
  const delay: number = 500;
  const { debounce } = useDebounce(delay, true);
  const { setRows, setIsLoading, setTotalCount } = useCitiesContext();
  const { city, page, setSearchParams } = useCitiesContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(page, city)
        .then((res) => {
          setIsLoading(false);

          if(res instanceof Error) {
            alert(res.message);
            return;
          } else {
            setRows(res.data);
            setTotalCount(res.totalCount);
          }
        });
    });
  },[city, page]);

  return (
    <LayoutPageBase 
      title='Lista de Cidades'
      taskBar={
        <SearchBar
          buttonText='Nova'
          searchInput
          searchText={city}
          onClickButton={() => navigate('/cidades/detalhe/nova')}
          onChangeSearchText={(text) => setSearchParams({ city: text, page: '1' }, { replace: true })}
        />
      }
    >
      <TableOfCities />
   </LayoutPageBase>
  );
}
