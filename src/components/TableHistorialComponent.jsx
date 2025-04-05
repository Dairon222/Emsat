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
} from "@mui/material";
import ButtonsExportComponent from "./ButtonsExportComponent";
import { useTheme } from "@mui/material/styles";

const STATUS_LABELS = {
  "en mora": "En Mora",
  devuelto: "Devuelto",
  activo: "Activo",
};

const STATUS_STYLES = {
  "en mora": { backgroundColor: "red" },
  devuelto: { backgroundColor: "green" },
  activo: { backgroundColor: "#f07520" },
};

const getNestedValue = (obj, path, defaultValue = "No disponible") => {
  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] ? acc[key] : defaultValue), obj);
};

const TableHistorialComponent = ({
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
          typeof fetchData === "function" ? await fetchData() : { data: [] };
        setData(response.data);
      } catch (err) {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData]);

  const theme = useTheme();

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns.some((col) =>
          String(getNestedValue(row, col.field) || "")
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
                        sx={{
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? theme.palette.grey[900]
                              : "#f5f5f5",
                          fontWeight: "bold",
                          color: theme.palette.text.primary,
                        }}
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
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    backgroundColor:
                                      STATUS_STYLES[row[col.field]]
                                        ?.backgroundColor || "grey",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color:
                                      STATUS_STYLES[row[col.field]]?.color ||
                                      "inherit",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {STATUS_LABELS[row[col.field]] ||
                                    "Desconocido"}
                                </Typography>
                              </Box>
                            ) : col.format ? (
                              col.format(getNestedValue(row, col.field))
                            ) : (
                              getNestedValue(row, col.field)
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
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
          />
        </>
      )}
    </Box>
  );
};

export default TableHistorialComponent;
