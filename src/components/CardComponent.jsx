/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CardComponent = ({ title, onCreate, icon, description }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
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
          width: 100,
          height: 100,
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
        <Box sx={{ display: "flex", flexDirection: "column", }}>
          <Typography variant="subtitle" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={onCreate}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
      >
        Crear
      </Button>
    </Card>
  );
};

export default CardComponent;
