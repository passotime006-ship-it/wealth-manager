// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mode, toggle } = useThemeMode();

  const links = [
    { label: 'Dashboard', path: '/' },
    { label: 'Spend', path: '/spend' },
    { label: 'Income', path: '/income' },
    { label: 'Invest', path: '/invest' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Reminders', path: '/reminders' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0, mr: 4 }}>
          Wealth Manager
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {links.map((l) => (
            <Button key={l.path} color="inherit" onClick={() => navigate(l.path)}>
              {l.label}
            </Button>
          ))}
        </Box>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
        <Tooltip title={mode === 'light' ? 'Switch to dark' : 'Switch to light'}>
          <IconButton color="inherit" onClick={toggle} sx={{ ml: 1 }}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
