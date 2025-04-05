import CreateFormsComponent from "../components/CreateFormsComponent";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Id sede", align: "center", hidden: true },
  { field: "username", headerName: "Nombre usuario", align: "center" },
  { field: "email", headerName: "Correo", align: "center" },
  {
    field: "numero_sede",
    headerName: "Sede", // Esto se muestra como la etiqueta del select
    align: "center",
    type: "select"
  },
  {
    field: "password",
    headerName: "Contraseña", // Se mostrará con ojito
    align: "center",
  },
];

const RegisterUserSede = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <CreateFormsComponent
      title="Crear usuario de la sede"
      columns={columns}
      endpoint="/register-sede"
      onSuccess={handleSuccess}
    />
  );
};

export default RegisterUserSede;
