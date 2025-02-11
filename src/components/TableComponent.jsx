/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  Box,
  TablePagination,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";
import ModalEditComponent from "./ModalEditComponent";
import ModalDeleteComponent from "./ModalDeleteComponent";
import ButtonsExportComponent from "./ButtonsExportComponent";

const TableComponent = ({
  columns,
  fetchData,
  title,
  noDataMessage = "No hay datos disponibles.",
  onReload,
  endpoint,
  keyField,
  deleteMessage,
  hiddenFields,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Cargar datos desde la API
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        typeof fetchData === "function"
          ? await fetchData()
          : await api.get(fetchData);
      setData(response.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [fetchData, onReload]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Abrir modal de edición con datos seleccionados
  const handleOpenEditModal = (row) => {
    if (!row) return;
    setSelectedRow(row);
    setOpenEditModal(true);
  };

  // Abrir modal de eliminación con datos seleccionados
  const handleOpenDeleteModal = (row) => {
    if (!row) return;
    setSelectedRow(row);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedRow(null);
  };

  // Guardar cambios en la API después de editar
  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`${endpoint}/${updatedData[keyField]}`, updatedData);
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
      loadData(); // Refrescar la tabla
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      setSnackbar({
        open: true,
        message: "Error al actualizar los datos.",
        severity: "error",
      });
    } finally {
      handleCloseModals();
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      {title && (
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <ButtonsExportComponent
            data={data}
            columns={columns}
            title={title}
            hiddenFields={hiddenFields}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              onChange={handleSearch}
              sx={{ width: "40%" }}
            />
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{ width: "15%" }}
            >
              {[5, 10, 25, 50].map((option) => (
                <MenuItem key={option} value={option}>
                  {option} registros
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TableContainer component={Paper}>
            {data.length === 0 ||
            data.filter((row) =>
              columns
                .filter((column) => !column.hidden) // Solo buscar en columnas visibles
                .some((column) =>
                  String(row[column.field])
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
            ).length === 0 ? (
              <Typography variant="body1" align="center" sx={{ p: 4 }}>
                {noDataMessage}
              </Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {columns
                      .filter((column) => !column.hidden) // Solo mostrar columnas visibles
                      .map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.align}
                          sx={{
                            backgroundColor: "#f5f5f5",
                            fontWeight: "bold",
                          }}
                        >
                          {column.headerName}
                        </TableCell>
                      ))}
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                    >
                      Funciones
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data
                    .filter((row) =>
                      columns
                        .filter((column) => !column.hidden) // Buscar solo en columnas visibles
                        .some((column) =>
                          String(row[column.field])
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns
                          .filter((column) => !column.hidden) // Mostrar solo columnas visibles
                          .map((column) => (
                            <TableCell key={column.field} align={column.align}>
                              {row[column.field]}
                            </TableCell>
                          ))}
                        <TableCell align="center">
                          <Button
                            size="small"
                            onClick={() => handleOpenEditModal(row)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleOpenDeleteModal(row)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <ModalEditComponent
        open={openEditModal}
        onClose={handleCloseModals}
        data={selectedRow}
        onSave={handleSaveEdit}
        title={title}
        hiddenFields={hiddenFields} // Campos que no se mostrarán
      />
      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={handleCloseModals}
        item={selectedRow}
        endpoint={endpoint}
        keyField={keyField}
        deleteMessage={deleteMessage}
        onSuccess={loadData}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TableComponent;
