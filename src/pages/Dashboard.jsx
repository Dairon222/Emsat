import { Container, Typography, Grid } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportIcon from '@mui/icons-material/Report';

const Dashboard = () => {
  const cards = [
    {
      title: 'Nuevo usuario',
      description: 'Añade un nuevo usuario al sistema.',
      icon: <PersonAddIcon />,
    },
    {
      title: 'Nueva herramienta',
      description: 'Agrega nuevos elementos al inventario.',
      icon: <Inventory2Icon />,
    },
    {
      title: 'Nuevo préstamo',
      description: 'Registra un nuevo préstamo.',
      icon: <AssignmentIcon />,
    },
    {
      title: 'Nuevo reporte',
      description: 'Genera un reporte del sistema.',
      icon: <ReportIcon />,
    },
  ];

  return (
    <>
      <HeaderComponent title="Dashboard" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al sistema de gestión
        </Typography>
        <Typography variant="body1" gutterBottom>
          Selecciona una opción para comenzar:
        </Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardComponent
                title={card.title}
                description={card.description}
                icon={card.icon}
                onClick={() => console.log(`${card.title} modal abierto`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
