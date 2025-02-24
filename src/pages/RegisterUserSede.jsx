import CreateFormsComponent from "../components/CreateFormsComponent";

const columns = [
  { field: "id", headerName: "Id sede", align: "center", hidden: true },
  { field: "username", headerName: "Nombre usuario", align: "center" },
  { field: "correo", headerName: "Correo", align: "center" },
  { field: "numero_sede", headerName: "Numero de la sede", align: "center" },
  { field: "contrasena", headerName: "Contraseña usuario", align: "center" },
];

const RegisterUserSede = () => {
  return (
    <CreateFormsComponent
      title="Crear usuario de la sede"
      columns={columns}
      endpoint="register-sede"
    />
  );
};

export default RegisterUserSede;
