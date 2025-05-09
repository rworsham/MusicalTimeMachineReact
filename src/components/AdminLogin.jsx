import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import AlertHandler from "./AlertHandler.jsx";
import Footer from "./Footer.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminLogin = () => {
    const { loginUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!username || !password) {
            setError("Username and Password are required");
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await loginUser({ username, password });
        } catch (error) {
            console.error(error);
            setError("Login Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(/warp.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100dvh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                px: 2
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    maxWidth: 700,
                    width: '100%',
                    textAlign: 'center',
                }}
            >
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

            <AlertHandler alertMessage={error} />

            <Footer />

        </Box>
    );
};

export default AdminLogin;