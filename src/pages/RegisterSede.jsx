import CreateFormsComponent from "../components/CreateFormsComponent";

const columns = [
  { field: "id", headerName: "Id sede", align: "center", hidden: true },
  { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
  { field: "numero_sede", headerName: "Número de la sede", align: "center" },
];

const RegisterSede = () => {
  return (
    <CreateFormsComponent
      title="Crear sede"
      columns={columns}
      endpoint="sede"
    />
  );
};

export default RegisterSede;
