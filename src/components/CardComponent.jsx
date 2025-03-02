/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CardComponent = ({ title, onCreate, icon, description }) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            color: "#4caf50",
            backgroundColor: "#e8f5e9",
            width: 75,
            height: 75,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            borderRadius: 2,
          }}
        >
          {icon || <AddCircleOutlineIcon />}
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ maxWidth: 150 }}
            >
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
    </Box>
  );
};

export default CardComponent;
