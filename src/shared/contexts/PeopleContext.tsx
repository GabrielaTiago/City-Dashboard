import { createContext,useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IListPerson } from '../services/personApi';
import { TChildrenProps } from '../types';

interface IPeopleContextProps {
  rows: IListPerson[];
  setRows: (row: IListPerson[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  totalCount: number;
  setTotalCount: (value: number) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params?: any, replace?: any)  => void;
  person: string;
}

const PeopleContext = createContext({} as IPeopleContextProps);

export const usePeopleContext = () => {
  return useContext(PeopleContext);
};

export function PeopleProvider({ children }: TChildrenProps){
  const [rows, setRows] = useState<IListPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const person = useMemo(() => {
    return searchParams.get('person') || '';
  }, [searchParams]);

  return (
    <PeopleContext.Provider 
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
          person,
        }
      }
    >
      {children}
    </PeopleContext.Provider>
  );
}