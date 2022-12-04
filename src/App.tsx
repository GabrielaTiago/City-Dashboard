import { BrowserRouter } from 'react-router-dom';
import './shared/forms/translationYup';

import { 
  AppThemeProvider,
  CitiesProvider,
  DrawerProvider,
  PeopleProvider
} from './shared/contexts';

import { Sidebar } from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <CitiesProvider>
              <PeopleProvider>
                <Sidebar>
                  <AppRoutes />
                </Sidebar>
              </PeopleProvider>
            </CitiesProvider>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
  );
}

export default App;
