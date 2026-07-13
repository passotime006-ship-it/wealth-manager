import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Shared design tokens for a clean, premium feel
const base: ThemeOptions = {
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h4: { fontWeight: 800, letterSpacing: -0.5 },
    h5: { fontWeight: 700, letterSpacing: -0.3 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow:
            '0 10px 30px -12px rgba(15, 23, 42, 0.18), 0 4px 12px -8px rgba(15, 23, 42, 0.12)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ ownerState }) => ({
          paddingInline: 20,
          fontWeight: 600,
          ...(ownerState.variant === 'contained' && ownerState.color === 'primary'
            ? { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }
            : {}),
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          color: '#0f172a',
          boxShadow: '0 1px 0 rgba(15,23,42,0.06)',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...base,
  palette: {
    mode: 'light',
    primary: { main: '#6366f1' },
    secondary: { main: '#f59e0b' },
    success: { main: '#10b981' },
    background: { default: 'transparent', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
  },
});

export const darkTheme = createTheme({
  ...base,
  palette: {
    mode: 'dark',
    primary: { main: '#818cf8' },
    secondary: { main: '#fbbf24' },
    success: { main: '#34d399' },
    background: { default: 'transparent', paper: '#1e293b' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
  },
  components: {
    ...base.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15,23,42,0.7)',
          backdropFilter: 'blur(12px)',
          color: '#f8fafc',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
        },
      },
    },
  },
});
