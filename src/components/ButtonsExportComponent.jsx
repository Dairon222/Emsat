/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Snackbar, Alert, Tooltip } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FileCopy, PictureAsPdf, TableChart } from "@mui/icons-material";

const ButtonsExportComponent = ({
  data,
  columns,
  title,
  hiddenFields = [],
}) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 🔥 Filtrar columnas visibles para la exportación
  const visibleColumns = columns.filter(
    (col) => !hiddenFields.includes(col.field)
  );

  // Exportar a Excel
  const handleExportExcel = () => {
    const exportData = data.map((row) => {
      const rowData = {};
      visibleColumns.forEach((col) => {
        rowData[col.headerName] = row[col.field];
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${title || "data"}.xlsx`);
    setSnackbar({
      open: true,
      message: "Datos exportados a Excel exitosamente.",
      severity: "success",
    });
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumnHeaders = visibleColumns.map((col) => col.headerName);
    const tableRows = data.map((row) =>
      visibleColumns.map((col) => row[col.field] || "")
    );

    doc.text(title || "Datos Exportados", 14, 15);
    doc.autoTable({ head: [tableColumnHeaders], body: tableRows, startY: 20 });
    doc.save(`${title || "data"}.pdf`);
    setSnackbar({
      open: true,
      message: "Datos exportados a PDF exitosamente.",
      severity: "success",
    });
  };

  // Copiar al Portapapeles
  const handleCopyToClipboard = () => {
    const textToCopy = [
      visibleColumns.map((col) => col.headerName).join("\t"),
      ...data.map((row) =>
        visibleColumns.map((col) => row[col.field] || "").join("\t")
      ),
    ].join("\n");

    navigator.clipboard.writeText(textToCopy).then(() => {
      setSnackbar({
        open: true,
        message: "Datos copiados al portapapeles.",
        severity: "success",
      });
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Tooltip title="Exportar a Excel">
        <Button variant="contained" color="primary" onClick={handleExportExcel}>
          <TableChart />
        </Button>
      </Tooltip>

      <Tooltip title="Exportar a PDF">
        <Button variant="contained" color="secondary" onClick={handleExportPDF}>
          <PictureAsPdf />
        </Button>
      </Tooltip>

      <Tooltip title="Copiar al Portapapeles">
        <Button variant="outlined" color="info" onClick={handleCopyToClipboard}>
          <FileCopy />
        </Button>
      </Tooltip>

      {/* Snackbar para notificaciones */}
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
  );
};

export default ButtonsExportComponent;
