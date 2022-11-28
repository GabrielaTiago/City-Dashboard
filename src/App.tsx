import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider, DrawerProvider, PeopleProvider } from './shared/contexts';
import {Sidebar} from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <PeopleProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Sidebar>
              <AppRoutes />
            </Sidebar>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </PeopleProvider>
  );
}

export default App;
