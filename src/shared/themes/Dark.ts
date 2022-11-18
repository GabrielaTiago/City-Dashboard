import { createTheme } from '@mui/material';
import { teal, deepPurple } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#202124',
      paper: '#303134',
    },
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
});
