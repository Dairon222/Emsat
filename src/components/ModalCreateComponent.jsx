/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/axios";

const CreateElementsComponent = ({
  open,
  onClose,
  title,
  columns,
  endpoint,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({});

  const [roles, setRoles] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Cargar roles y fichas desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, fichasRes] = await Promise.all([
          api.get("/rol"),
          api.get("/ficha"),
        ]);

        setRoles(rolesRes.data);
        setFichas(fichasRes.data);
      } catch (error) {
        console.error("Error al cargar roles o fichas:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["rol_id", "ficha_id"].includes(name) ? Number(value) : value, // Solo convierte a número los select
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "" });

    console.log("Datos enviados:", formData);

    try {
      const response = await api.post(endpoint, formData);
      console.log("Respuesta de la API:", response.data);
      if (onSuccess) onSuccess(response.data);
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error al crear el elemento:", error);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {fetchingData ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {columns
              .filter((column) => !column.hidden)
              .map((column) => {
                if (column.field === "rol_id") {
                  return (
                    <Select
                      name="rol_id"
                      key="rol_id"
                      value={formData.rol_id || ""}
                      onChange={handleInputChange}
                      displayEmpty
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="" disabled>
                        Seleccione un rol
                      </MenuItem>
                      {roles.map((rol) => (
                        <MenuItem key={rol.id} value={rol.id}>
                          {rol.tipo}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }

                if (column.field === "ficha_id") {
                  return (
                    <Select
                      name="ficha_id"
                      key="ficha_id"
                      value={formData.ficha_id || ""}
                      onChange={handleInputChange}
                      displayEmpty
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="" disabled>
                        Seleccione una ficha
                      </MenuItem>
                      {fichas.map((ficha) => (
                        <MenuItem key={ficha.id} value={ficha.id}>
                          {ficha.nombre_ficha}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }

                return (
                  <TextField
                    key={column.field}
                    label={column.headerName}
                    name={column.field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleInputChange}
                  />
                );
              })}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Creando..." : "Crear"}
            </Button>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default CreateElementsComponent;
