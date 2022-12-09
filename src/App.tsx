import { BrowserRouter } from 'react-router-dom';
import './shared/forms/translationYup';

import { 
  AppThemeProvider,
  AuthProvider,
  CitiesProvider,
  DrawerProvider,
  PeopleProvider
} from './shared/contexts';

import { Login, Sidebar } from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Login>
              <CitiesProvider>
                <PeopleProvider>
                  <Sidebar>
                    <AppRoutes />
                  </Sidebar>
                </PeopleProvider>
              </CitiesProvider>
            </Login>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
   </AuthProvider>
  );
}

export default App;
