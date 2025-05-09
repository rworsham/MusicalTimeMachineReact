import React, { useState, useContext} from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext.jsx';
import AlertHandler from './AlertHandler.jsx';
import Footer from './Footer.jsx';
import SeedDataForm from "../Forms/SeedDataForm.jsx";

const AdminDashboard = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error(err);
            setError('Failed to log out');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={100} />
            </Box>
        );
    }


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
                <Typography variant="h4" color="primary">
                    Welcome, {user}!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mb: 4}}
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
                </Button>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Users Overview
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Users
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Billboard Data
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Data
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Billboard Data
                                </Typography>
                                <SeedDataForm onError={handleError} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <AlertHandler alertMessage={error} />

            <Footer />

        </Box>
    );
};

export default AdminDashboard;