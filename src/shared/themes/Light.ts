import { createTheme } from '@mui/material';
import { teal, deepPurple } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[800],
      dark: deepPurple[900],
      light: deepPurple[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: teal[600],
      dark: teal[700],
      light: teal[400],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#E5E5E5',
      paper: '#FFFFFF',
    },
  },
});
