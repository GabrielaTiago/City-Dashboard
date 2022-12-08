import { BrowserRouter } from 'react-router-dom';
import './shared/forms/translationYup';

import { 
  AppThemeProvider,
  AuthProvider,
  CitiesProvider,
  DrawerProvider,
  PeopleProvider
} from './shared/contexts';

import { Sidebar } from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
