/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  // eslint-disable-next-line no-unused-vars
  Icon,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CardComponent = ({ title, description, icon, onClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: 1,
        paddingRight: 2,
        boxShadow: 2,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#4caf50",
          color: "#fff",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          mr: 1,
        }}
      >
        {icon || <AddCircleOutlineIcon />}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          padding: "8px 18px",
        }}
      >
        Crear
      </Button>
    </Card>
  );
};

export default CardComponent;
