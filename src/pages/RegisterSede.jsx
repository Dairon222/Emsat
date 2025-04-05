import CreateFormsComponent from "../components/CreateFormsComponent";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Id sede", align: "center", hidden: true },
  { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
  {
    field: "numero_sede",
    headerName: "Número de la sede",
    align: "center",
    inputType: "number",
  },
];

const RegisterSede = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/user");
  };

  return (
    <CreateFormsComponent
      title="Crear sede"
      columns={columns}
      endpoint="sede"
      onSuccess={handleSuccess}
    />
  );
};

export default RegisterSede;
