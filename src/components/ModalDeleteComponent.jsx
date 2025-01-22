/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalDeleteComponent = ({ open, onClose, item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item);
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
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirmar Eliminación
        </Typography>
        {item && (
          <Typography>
            ¿Realmente desea eliminar a <b>{item.nombre}</b>?
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDeleteComponent;
