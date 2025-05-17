import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import { AlertProvider } from './context/AlertContext.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Home from './components/Home.jsx';
import TimeTravel from './components/TimeTravel.jsx';
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import PlaylistCreated  from "./components/PlaylistCreated.jsx";
import './App.css';
import Layout from "./components/Layout.jsx";
import ContactForm from "./Forms/ContactForm.jsx";

function App() {
    const { authTokens, user, loading, loginUser, logout } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return authTokens ? children : <Navigate to="/login" />;
    };

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                  <AlertProvider>
                      <Layout>
                          <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/contact" element={<ContactForm />} />
                              <Route path="/timetravel" element={<TimeTravel />} />
                              <Route path="/timetravel1" element={<PlaylistCreated />} />
                              <Route path="/admin/login" element={<AdminLogin />} />
                              <Route path="/admin/dashboard" element={<AdminDashboard />} />
                          </Routes>
                      </Layout>
                  </AlertProvider>
              </Box>
        </ThemeProvider>
    );
}

export default App;