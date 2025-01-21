// TableComponent.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";

const TableComponent = ({ columns, data, title, noDataMessage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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

  return (
    <Box sx={{ mt: 4 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
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
          {[5, 10, 15, 20].map((option) => (
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
                    align={column.align || "left"}
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align || "left"}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  noDataMessage: PropTypes.string,
};

TableComponent.defaultProps = {
  title: "",
  noDataMessage: "No se encontraron resultados.",
};

export default TableComponent;
