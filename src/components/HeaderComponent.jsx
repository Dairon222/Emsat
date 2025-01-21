/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = ({ title }) => {
  const navLinks = [
    { text: 'Inicio', path: '/' },
    { text: 'Inventarios', path: '/inventory' },
    { text: 'Usuarios', path: '/users' },
    { text: 'Préstamos', path: '/loans' },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Title */}
        <Typography variant="h6" component="div">
          {title}
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.text}
              component={Link}
              to={link.path}
              color="inherit"
            >
              {link.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
