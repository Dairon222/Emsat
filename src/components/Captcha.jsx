/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Home,
  Star,
  Favorite,
  Pets,
  DirectionsCar,
  Flight,
  LocalCafe,
  ShoppingCart,
  SportsSoccer,
  DirectionsBike,
  MusicNote,
  Computer,
  Smartphone,
  CameraAlt,
  Restaurant,
  Park,
  School,
  Train,
  DirectionsBoat,
  FitnessCenter,
  LocalHospital,
  EmojiNature,
  Nightlight,
} from "@mui/icons-material";

const allIcons = [
  { name: "Casa", icon: <Home /> },
  { name: "Estrella", icon: <Star /> },
  { name: "Corazón", icon: <Favorite /> },
  { name: "Huella", icon: <Pets /> },
  { name: "Carro", icon: <DirectionsCar /> },
  { name: "Avión", icon: <Flight /> },
  { name: "Café", icon: <LocalCafe /> },
  { name: "Carrito de compras", icon: <ShoppingCart /> },
  { name: "Balón", icon: <SportsSoccer /> },
  { name: "Bicicleta", icon: <DirectionsBike /> },
  { name: "Nota musical", icon: <MusicNote /> },
  { name: "Computador", icon: <Computer /> },
  { name: "Celular", icon: <Smartphone /> },
  { name: "Cámara", icon: <CameraAlt /> },
  { name: "Cubiertos", icon: <Restaurant /> },
  { name: "Pino", icon: <Park /> },
  { name: "Graduación", icon: <School /> },
  { name: "Tren", icon: <Train /> },
  { name: "Barco", icon: <DirectionsBoat /> },
  { name: "Mancuerna", icon: <FitnessCenter /> },
  { name: "Cruz", icon: <LocalHospital /> },
  { name: "Abeja", icon: <EmojiNature /> },
  { name: "Luna", icon: <Nightlight /> },
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
    setTargetIcon(
      randomIcons[Math.floor(Math.random() * randomIcons.length)].name
    );
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
