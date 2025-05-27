import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext.jsx';
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline, Box, CircularProgress} from '@mui/material';
import theme from './theme';
import Home from './components/Home.jsx';
import TimeTravel from './components/TimeTravel.jsx';
import AdminLogin from "./components/AdminLogin.jsx";
import './App.css';
import Layout from "./components/Layout.jsx";
import ContactForm from "./Forms/ContactForm.jsx";
import NotFound from "./components/404NotFound.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
const AdminDashboard = lazy(() => import('./components/AdminDashboard.jsx'));

function App() {
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                  <AlertProvider>
                      <Layout>
                          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>}>
                              <Routes>
                                  <Route path="/" element={<Home />} />
                                  <Route path="/contact" element={<ContactForm />} />
                                  <Route path="/privacy" element={<PrivacyPolicy />} />
                                  <Route path="/terms" element={<TermsAndConditions />} />
                                  <Route path="/timetravel" element={<TimeTravel />} />
                                  <Route path="/admin/login" element={<AdminLogin />} />
                                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                  <Route path="*" element={<NotFound />} />
                              </Routes>
                          </Suspense>
                      </Layout>
                  </AlertProvider>
              </Box>
        </ThemeProvider>
    );
}

export default App;