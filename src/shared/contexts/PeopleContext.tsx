import { createContext, useContext, useState } from 'react';
import { IListPerson } from '../services/personApi';
import { TChildrenProps } from '../types';

interface IPeopleContextProps {
  rows: IListPerson[];
  setRows: (row: IListPerson[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  totalCount: number;
  setTotalCount: (value: number) => void;
}

const PeopleContext = createContext({} as IPeopleContextProps);

export const usePeopleContext = () => {
  return useContext(PeopleContext);
};

export function PeopleProvider({ children }: TChildrenProps){
  const [rows, setRows] = useState<IListPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  return (
    <PeopleContext.Provider 
      value={
        { rows, setRows, isLoading, setIsLoading, totalCount, setTotalCount }
      }
    >
        {children}
    </PeopleContext.Provider>
  );
}