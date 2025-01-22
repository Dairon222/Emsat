/* eslint-disable react/prop-types */
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ModalEditComponent = ({ open, onClose, data, onSave, title }) => {
  const handleSave = () => {
    onSave(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          {title || 'Editar'}
        </Typography>
        {data && (
          <Box>
            {Object.keys(data).map((key) => (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                defaultValue={data[key]}
                fullWidth
                size='small'
                sx={{ mb: 3}}
              />
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditComponent;
