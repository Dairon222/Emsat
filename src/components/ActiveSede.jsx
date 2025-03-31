/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Switch, FormControlLabel, Box, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const ToggleSedeButton = ({ sedeId, initialActive, onToggle }) => {
  const [active, setActive] = useState(initialActive === 1);
  const theme = useTheme(); // Detectar el tema actual

  useEffect(() => {
    setActive(initialActive === 1);
  }, [initialActive]);

  const handleToggle = () => {
    const newState = active ? 0 : 1;
    setActive(newState === 1);
    onToggle(sedeId, newState);
  };

  return (
    <Box
      sx={{
        width: "30%",
        padding: 1,
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#e8f5e9", // Cambio de color en modo oscuro
      }}
    >
      <FormControlLabel
        control={
          <Switch checked={active} onChange={handleToggle} color="primary" />
        }
        sx={{ ml: 1 }}
        label={active}
        labelPlacement="end"
        checkedIcon={<CheckCircle sx={{ color: "green" }} />}
      />
    </Box>
  );
};

export default ToggleSedeButton;
