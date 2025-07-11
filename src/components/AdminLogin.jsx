import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { AuthContext } from "../context/AuthContext.jsx";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {useAlert} from "../context/AlertContext.jsx";

const AdminLogin = () => {
    const { loginUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showError } = useAlert();

    const validateForm = () => {
        if (!username || !password) {
            showError("Username and Password are required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        if (!executeRecaptcha) {
            showError('Recaptcha is not ready', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = await executeRecaptcha('admin_login_form_submit');

            await loginUser({ username, password, captchaToken: token });
        } catch (error) {
            console.error(error);
            showError("Login Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            <Typography variant="h5" mb={2} align="center">
                Login
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    width: '100%',
                    mt: 4
                }}
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
            </Box>

        </Box>
    );
};

export default AdminLogin;