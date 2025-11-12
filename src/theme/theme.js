import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: {
      main: colors.status.error,
    },
    warning: {
      main: colors.status.warning,
    },
    info: {
      main: colors.status.info,
    },
    success: {
      main: colors.status.success,
    },
    grey: colors.grey,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
      dark: colors.background.dark,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '8px 20px',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      color: colors.primary.dark,
    },
    h2: {
      fontWeight: 600,
      color: colors.primary.main,
    },
    h3: {
      fontWeight: 600,
      color: colors.primary.main,
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
