import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { TChildrenProps } from '../types';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export function DrawerProvider({ children }: TChildrenProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((oldDrawer) => !oldDrawer);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}
