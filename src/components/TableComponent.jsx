/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// TableComponent.jsx
import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalEditComponent from './ModalEditComponent';
import ModalDeleteComponent from './ModalDeleteComponent';

const TableComponent = ({ columns, data, title, noDataMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const dynamicStatusGreen = ['Activo', 'Disponible', 'Presente'];
  const dynamicStatusRed = ['Inactivo', 'No disponible', 'En mora'];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column.field]).toLowerCase().includes(searchTerm)
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenEditModal = (row) => {
    setSelectedRow(row);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (row) => {
    setSelectedRow(row);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = (updatedData) => {
    setSnackbar({ open: true, message: 'Datos actualizados exitosamente.', severity: 'success' });
    handleCloseModals();
  };

  const handleDelete = (row) => {
    setSnackbar({ open: true, message: `Elemento eliminado: ${row.nombre}`, severity: 'error' });
    handleCloseModals();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 1 }}>
      {title && (
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          sx={{ width: '40%' }}
        />
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          size="small"
          sx={{ width: '15%' }}
        >
          {[5, 10, 25, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option} registros
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TableContainer component={Paper}>
        {filteredData.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ p: 4 }}>
            {noDataMessage}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                >
                  Funciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align}
                      sx={{
                        color:
                          column.field === 'estado'
                            ? dynamicStatusGreen.includes(row[column.field])
                              ? 'green'
                              : dynamicStatusRed.includes(row[column.field])
                              ? 'red'
                              : 'inherit'
                            : 'inherit',
                        fontWeight: column.field === 'estado' ? 'bold' : 'normal',
                      }}
                    >
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modals */}
      <ModalEditComponent
        open={openEditModal}
        onClose={handleCloseModals}
        data={selectedRow}
        onSave={handleSaveEdit}
        title={title}
      />
      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={handleCloseModals}
        item={selectedRow}
        onDelete={handleDelete}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TableComponent;
