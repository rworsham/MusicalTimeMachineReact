import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Home from './components/Home.jsx';
import TimeTravel from './components/TimeTravel.jsx';
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import './App.css';

function App() {
    const { authTokens, user, loading, loginUser, logout } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return authTokens ? children : <Navigate to="/login" />;
    };

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/timetravel" element={<TimeTravel />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  </Routes>
              </Box>
        </ThemeProvider>
    );
}

export default App;