import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";
import Loans from "./pages/Loans";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import SedeProvider from "./context/SedeContext";
import Morosos from "./pages/Morosos";

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
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/loans" element={<Loans />} />
                    <Route path="/morosos" element={<Morosos />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </SedeProvider>
    </ThemeProvider>
  );
};

export default App;
