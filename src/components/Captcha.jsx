/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { 
  Notifications, Home, Star, DirectionsCar, Flight, 
  Favorite, Work, Pets, SportsSoccer, 
  Computer, ShoppingCart, MusicNote, LocalCafe, CameraAlt, 
  School
} from "@mui/icons-material";

const allIcons = [
  { name: "Campana", icon: <Notifications /> },
  { name: "Casa", icon: <Home /> },
  { name: "Estrella", icon: <Star /> },
  { name: "Coche", icon: <DirectionsCar /> },
  { name: "Avión", icon: <Flight /> },
  { name: "Corazón", icon: <Favorite /> },
  { name: "Portafolio", icon: <Work /> },
  { name: "Huella", icon: <Pets /> },
  { name: "Escuela", icon: <School /> },
  { name: "Balón", icon: <SportsSoccer /> },
  { name: "Computadora", icon: <Computer /> },
  { name: "Carrito", icon: <ShoppingCart /> },
  { name: "Música", icon: <MusicNote /> },
  { name: "Café", icon: <LocalCafe /> },
  { name: "Cámara", icon: <CameraAlt /> },
];

const getRandomIcons = () => {
  const shuffled = allIcons.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

const Captcha = ({ onSelect }) => {
  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [targetIcon, setTargetIcon] = useState("");

  useEffect(() => {
    const randomIcons = getRandomIcons();
    setIcons(randomIcons);
    setTargetIcon(randomIcons[Math.floor(Math.random() * randomIcons.length)].name);
  }, []);

  const handleSelect = (name) => {
    setSelectedIcon(name);
    onSelect(name === targetIcon ? name : null);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <Typography variant="body1">
        Seleccione la imagen: <strong>{targetIcon}</strong>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
        {icons.map(({ name, icon }) => (
          <IconButton
            key={name}
            onClick={() => handleSelect(name)}
            sx={{ color: selectedIcon === name ? "green" : "gray" }}
          >
            {icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Captcha;
