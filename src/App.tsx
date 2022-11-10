import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from './shared/contexts';
import {Sidebar} from './shared/components';

import AppRoutes from './routes';

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
