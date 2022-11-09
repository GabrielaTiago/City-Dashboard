import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from './shared/contexts';
import AppRoutes from './routes';

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
