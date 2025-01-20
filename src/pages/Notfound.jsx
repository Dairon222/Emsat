
import { Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Página no encontrada
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lo sentimos, la página que buscas no existe.
        </Typography>
        <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Volver al inicio
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;
