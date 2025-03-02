import CreateFormsComponent from "../components/CreateFormsComponent";
import { useNavigate } from "react-router-dom";


const columns = [
  { field: "id", headerName: "Id sede", align: "center", hidden: true },
  { field: "username", headerName: "Nombre usuario", align: "center" },
  { field: "email", headerName: "Correo", align: "center" },
  { field: "numero_sede", headerName: "Numero de la sede", align: "center" },
  { field: "password", headerName: "Contraseña usuario", align: "center" },
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
      endpoint="register-sede"
      onSuccess={handleSuccess}
    />
  );
};

export default RegisterUserSede;
