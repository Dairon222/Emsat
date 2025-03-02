import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";
import Loans from "./pages/Loans";
import Login from "./pages/Login";
import SedeProvider from "./context/SedeContext";
import Enviroments from "./pages/Enviroments";
import Roles from "./pages/Roles";
import Fichas from "./pages/Fichas";
import Historial from "./pages/Historial";
import RegisterSede from "./pages/RegisterSede";
import RegisterUserSede from "./pages/RegisterUserSede";
import DashboardAdmin from "./admin/DashboardAdmin";
import InfoSedesAdmin from "./admin/InfoSedesAdmin";
import InfoUsersAdmin from "./admin/InfoUsersAdmin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: { main: "#388e3c" },
    secondary: { main: "#ef6c00" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SedeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sede" element={<RegisterSede />} />
            <Route path="/user" element={<RegisterUserSede />} />

            {/* Rutas protegidas para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/inventory"
                element={
                  <Layout>
                    <Inventory />
                  </Layout>
                }
              />
              <Route
                path="/users"
                element={
                  <Layout>
                    <Users />
                  </Layout>
                }
              />
              <Route
                path="/loans"
                element={
                  <Layout>
                    <Loans />
                  </Layout>
                }
              />
              <Route
                path="/fichas"
                element={
                  <Layout>
                    <Fichas />
                  </Layout>
                }
              />
              <Route
                path="/enviroments"
                element={
                  <Layout>
                    <Enviroments />
                  </Layout>
                }
              />
              <Route
                path="/roles"
                element={
                  <Layout>
                    <Roles />
                  </Layout>
                }
              />
              <Route
                path="/historial"
                element={
                  <Layout>
                    <Historial />
                  </Layout>
                }
              />
            </Route>

            {/* Rutas protegidas solo para administradores */}
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route
                path="/admin"
                element={
                  <Layout isAdmin={true}>
                    <DashboardAdmin />
                  </Layout>
                }
              />
              <Route
                path="/info-sedes"
                element={
                  <Layout isAdmin={true}>
                    <InfoSedesAdmin />
                  </Layout>
                }
              />
              <Route
                path="/info-users"
                element={
                  <Layout isAdmin={true}>
                    <InfoUsersAdmin />
                  </Layout>
                }
              />
            </Route>

            {/* Ruta 404 en caso de no encontrar alguna */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SedeProvider>
    </ThemeProvider>
  );
};

export default App;
