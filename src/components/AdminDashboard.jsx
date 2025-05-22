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
import { useAlert } from '../context/AlertContext.jsx';
import SeedDataForm from "../Forms/SeedDataForm.jsx";
import AdminUsageOverview from "./AdminUsageOverview.jsx";

const AdminDashboard = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useAlert();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error(err);
            showError('Failed to log out', 'error');
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
        <Box>
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
                                Usage Overview
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <AdminUsageOverview />
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
                            <SeedDataForm/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;