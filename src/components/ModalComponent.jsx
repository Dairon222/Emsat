
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalComponent = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography id="modal-description" variant="body2" gutterBottom>
          {children}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ModalComponent.defaultProps = {
  children: null,
};

export default ModalComponent;
