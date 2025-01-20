import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Users from './pages/Users';
import Loans from './pages/Loans';
import NotFound from './pages/Notfound';

const theme = createTheme({
    palette: {
      primary: {
        main: '#388e3c',
      },
      secondary: {
        main: '#ef6c00',
      },
    },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/users" element={<Users />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;