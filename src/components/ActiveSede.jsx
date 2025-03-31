/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Switch, FormControlLabel, Box, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const ToggleSedeButton = ({ sedeId, initialActive, onToggle }) => {
  const [active, setActive] = useState(initialActive); // Ahora es true por defecto
  const theme = useTheme(); // Detectar el tema actual

  useEffect(() => {
    setActive(initialActive); 
  }, [initialActive]);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    onToggle(sedeId, newState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "35%",
        backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#e8f5e9",
        padding: 1,
        borderRadius: 1,
      }}
    >
      <FormControlLabel
        control={
          <Switch checked={active} onChange={handleToggle} color="primary" />
        }
        label={active ? "Activo" : "Inactivo"}
        labelPlacement="end"
        checkedIcon={<CheckCircle sx={{ color: "green" }} />}
      />
    </Box>
  );
};

export default ToggleSedeButton;
