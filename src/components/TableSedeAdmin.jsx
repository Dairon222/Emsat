/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
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
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api/axios";
import ModalEditComponent from "./ModalEditComponent";
import ButtonsExportComponent from "./ButtonsExportComponent";

const TableComponent = ({
  columns,
  fetchData,
  title,
  noDataMessage = "No hay datos disponibles.",
  onReload,
  endpoint,
  keyField,
  hiddenFields,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response =
          typeof fetchData === "function"
            ? await fetchData()
            : await api.get(fetchData);
        setData(response.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(
          err.response?.data?.message || "No se pudieron cargar los datos."
        );
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData, onReload]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenEditModal = (row) => {
    setSelectedRow(row);
    setOpenEditModal(true);
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`${endpoint}/${updatedData[keyField]}`, updatedData);
      setData((prevData) =>
        prevData.map((row) =>
          row[keyField] === updatedData[keyField] ? updatedData : row
        )
      );
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
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

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns
          .filter((col) => !col.hidden)
          .some((col) => {
            const value = col.field
              .split(".")
              .reduce((acc, key) => acc?.[key], row);
            return String(value || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
      ),
    [data, searchTerm, columns]
  );

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
            data={filteredData}
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
            {filteredData.length === 0 ? (
              <Typography variant="body1" align="center" sx={{ p: 4 }}>
                {noDataMessage}
              </Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {columns
                      .filter((col) => !col.hidden)
                      .map((col) => (
                        <TableCell
                          key={col.field}
                          align={col.align}
                          sx={{
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[900]
                                : "#f5f5f5",
                            color: theme.palette.text.primary,
                            fontWeight: "bold",
                          }}
                        >
                          {col.headerName}
                        </TableCell>
                      ))}
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.grey[900]
                            : "#f5f5f5",
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns
                          .filter((col) => !col.hidden)
                          .map((col) => (
                            <TableCell key={col.field} align={col.align}>
                              {col.renderCell
                                ? col.renderCell(row)
                                : col.field
                                    .split(".")
                                    .reduce((acc, key) => acc?.[key], row) ??
                                  "No aplica"}
                            </TableCell>
                          ))}
                        <TableCell align="center">
                          <Button
                            size="small"
                            onClick={() => handleOpenEditModal(row)}
                          >
                            <EditIcon />
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
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
          />
        </>
      )}

      <ModalEditComponent
        open={openEditModal}
        onClose={handleCloseModals}
        data={selectedRow}
        onSave={handleSaveEdit}
        hiddenFields={hiddenFields}
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
