import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Home from './components/Home.jsx'
import TimeTravel from './components/TimeTravel.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import TermsAndConditions from './components/TermsAndConditions.jsx'
import './App.css'

function App() {
    const { authTokens, user, loading, loginUser, logout } = useContext(AuthContext);


    const PrivateRoute = ({ children }) => {
        return authTokens ? children : <Navigate to="/login" />;
    };

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/TimeTravel" element={<TimeTravel />} />
                      <Route path="/success" element={<Sucess />} />
                      <Route path="/login" element={<AdminLogin />} />
                      <Route path="/logout" element={<Logout logout={logout} />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsAndConditions />} />
                  </Routes>
              </Box>
          </Router>
        </ThemeProvider>
  )
}

const AppWithProvider = () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
};

export default AppWithProvider;
