/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({ columns, data, title, noDataMessage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column.field]).toLowerCase().includes(searchTerm)
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          sx={{ width: "30%" }}
        />
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          size="small"
          sx={{ width: "15%" }}
        >
          {[5, 10, 15].map((option) => (
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
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
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
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align}
                      sx={{
                        color:
                          column.field === "estado"
                            ? row[column.field] === "Activo"
                              ? "green"
                              : "red"
                            : "inherit",
                        fontWeight:
                          column.field === "estado" ? "bold" : "normal",
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
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleCloseModals}>
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
            Editar Usuario
          </Typography>
          {selectedRow && (
            <Box>
              <TextField
                label="Nombre"
                size="small"
                defaultValue={selectedRow.name}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Rol"
                size="small"
                defaultValue={selectedRow.role}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Estado"
                size="small"
                defaultValue={selectedRow.status}
                fullWidth
              />
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleCloseModals}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseModals}>
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
          {selectedRow && (
            <Typography>
              ¿Realmente desea eliminar al usuario <b>{selectedRow.name}</b>?
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModals}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableComponent;
