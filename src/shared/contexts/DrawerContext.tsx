import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { TChildrenProps } from '../types';

interface IDrawerOptions {
  icon: string;
  path: string;
  label: string;
};
interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export function DrawerProvider({ children }: TChildrenProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((oldDrawer) => !oldDrawer);
  }, []);

  const handleDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, drawerOptions, setDrawerOptions: handleDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
}
