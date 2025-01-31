/* eslint-disable react/prop-types */
// ModalEditComponent.jsx
import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ModalEditComponent = ({ open, onClose, data, onSave, title }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data); // Cargar los datos actuales al abrir el modal
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData); // Enviar solo los datos editados
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          width: 450,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          {title || "Editar"}
        </Typography>
        {data && (
          <Box>
            {Object.keys(data).map((key) => (
              <TextField
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key] || ""}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            ))}
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditComponent;
