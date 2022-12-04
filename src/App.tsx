import { BrowserRouter } from 'react-router-dom';
import './shared/forms/translationYup';

import { AppThemeProvider, DrawerProvider, PeopleProvider } from './shared/contexts';
import { Sidebar } from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <PeopleProvider>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </PeopleProvider>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
  );
}

export default App;
