/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
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
  Select,
  MenuItem,
  Box,
  TablePagination,
  CircularProgress,
  Chip,
} from "@mui/material";
import api from "../api/axios";
import ButtonsExportComponent from "./ButtonsExportComponent";

const STATUS_LABELS = {
  "en mora": "En Mora",
  devuelto: "Devuelto",
  activo: "Activo",
};

const STATUS_STYLES = {
  "en mora": { backgroundColor: "#ffcccc", color: "#d32f2f" }, // Rojo claro
  devuelto: { backgroundColor: "#ccffcc", color: "#388e3c" }, // Verde claro
  activo: { backgroundColor: "#f07520", color: "#fff" }, // Naranja
};

const TableHistorial = ({
  columns,
  fetchData,
  title,
  noDataMessage = "No hay datos disponibles.",
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData]);

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns.some((col) =>
          String(row[col.field] || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
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
          <ButtonsExportComponent data={data} columns={columns} title={title} />
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
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "40%" }}
            />
            <Select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
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
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        align={col.align}
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        {col.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((col) => (
                          <TableCell key={col.field} align={col.align}>
                            {col.field === "estado" ? (
                              <Chip
                                label={
                                  STATUS_LABELS[row[col.field]] || "Desconocido"
                                }
                                sx={{
                                  backgroundColor:
                                    STATUS_STYLES[row[col.field]]
                                      ?.backgroundColor || "grey",
                                  color:
                                    STATUS_STYLES[row[col.field]]?.color ||
                                    "white",
                                  fontWeight: "bold",
                                }}
                              />
                            ) : (
                              row[col.field]
                            )}
                          </TableCell>
                        ))}
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
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default TableHistorial;
