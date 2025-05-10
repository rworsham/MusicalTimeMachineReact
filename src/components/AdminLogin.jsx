import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import AlertHandler from "./AlertHandler.jsx";
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

            <AlertHandler alertMessage={error} />
        </Box>
    );
};

export default AdminLogin;