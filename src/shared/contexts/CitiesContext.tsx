import { createContext,useContext, useMemo, useState } from 'react';
import { NavigateOptions, URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { IListCity } from '../services/citiesApi';
import { TChildrenProps } from '../types';

interface ICitiesContextProps {
  rows: IListCity[];
  setRows: (row: IListCity[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  totalCount: number;
  setTotalCount: (value: number) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params?: URLSearchParamsInit, navigateOpts?: NavigateOptions)  => void;
  city: string;
  page: number;
}

const CitiesContext = createContext({} as ICitiesContextProps);

export const useCitiesContext = () => {
  return useContext(CitiesContext);
};

export function CitiesProvider({ children }: TChildrenProps): JSX.Element {
  const [rows, setRows] = useState<IListCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const city = useMemo(() => {
    return searchParams.get('city') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);
  
  return (
    <CitiesContext.Provider 
      value={
        { 
          rows,
          setRows,
          isLoading,
          setIsLoading,
          totalCount,
          setTotalCount,
          searchParams,
          setSearchParams,
          city,
          page
        }
      }
    >
      {children}
    </CitiesContext.Provider>
  );
}
