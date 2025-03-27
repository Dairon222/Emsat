/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Snackbar, Alert, Tooltip } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FileCopy, PictureAsPdf, TableChart } from "@mui/icons-material";
import { useSede } from "../context/SedeContext"; // Importar el contexto

const ButtonsExportComponent = ({
  data,
  columns,
  title,
  hiddenFields = [],
}) => {
  const { sede, userName } = useSede(); // Obtener la sede actual

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const visibleColumns = columns.filter(
    (col) => !hiddenFields.includes(col.field)
  );

  const handleExportExcel = () => {
    const sedeInfo = [{ Información: `Sede: ${sede || "No disponible"}` }];
    const exportData = data.map((row) => {
      const rowData = {};
      visibleColumns.forEach((col) => {
        rowData[col.headerName] = col.field.includes(".")
          ? col.field.split(".").reduce((acc, key) => acc?.[key], row) ||
            "No disponible"
          : row[col.field] || "No disponible";
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet([
      ...sedeInfo,
      {},
      ...exportData,
    ]);
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/logo_sena.png";
    const date = new Date().toLocaleDateString();
    img.onload = () => {
      doc.addImage(img, "PNG", 160, 10, 30, 30);
      doc.setFontSize(12);
      doc.text(title || "Datos Exportados", 14, 15);
      doc.text(`Sede: ${sede || "No disponible"}`, 14, 22);
      doc.text(`Fecha: ${date}`, 14, 29);
      doc.text(`Usuario: ${userName || "Desconocido"}`, 14, 36);

      const tableColumnHeaders = visibleColumns.map((col) => col.headerName);
      const tableRows = data.map((row) =>
        visibleColumns.map((col) =>
          col.field.includes(".")
            ? col.field.split(".").reduce((acc, key) => acc?.[key], row) ||
              "No disponible"
            : row[col.field] || "No disponible"
        )
      );
      doc.autoTable({
        head: [tableColumnHeaders],
        body: tableRows,
        startY: 40,
      });
      doc.save(`${title || "data"}.pdf`);
    };
    setSnackbar({
      open: true,
      message: "Datos exportados a PDF exitosamente.",
      severity: "success",
    });
  };
  const handleCopyToClipboard = () => {
    const textToCopy = [
      `Sede: ${sede || "No disponible"}`,
      visibleColumns.map((col) => col.headerName).join("\t"),
      ...data.map((row) =>
        visibleColumns
          .map((col) =>
            col.field.includes(".")
              ? col.field.split(".").reduce((acc, key) => acc?.[key], row) ||
                "No disponible"
              : row[col.field] || "No disponible"
          )
          .join("\t")
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
