import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const AdminUsageOverview = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const { showError } = useAlert();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getLogs = async () => {
            setIsLoading(true);
            try {
                const response = await adminApi.get('/logs');
                setLogs(response.data.logs);
            } catch (error) {
                console.error(error);
                showError('Failed to get logs, please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        getLogs();
    }, [showError]);

    const groupByHour = (logs) => {
        const hourMap = {};

        logs.forEach(({ createdAt, isPublic }) => {
            const date = new Date(createdAt);
            const hour = date.getHours();
            const key = `${hour}:00`;

            if (!hourMap[key]) {
                hourMap[key] = { hour: key, public: 0, private: 0 };
            }

            if (isPublic) hourMap[key].public += 1;
            else hourMap[key].private += 1;
        });

        return Object.values(hourMap).sort((a, b) => {
            const hourA = parseInt(a.hour.split(':')[0], 10);
            const hourB = parseInt(b.hour.split(':')[0], 10);
            return hourA - hourB;
        });
    };

    const groupByDay = (logs) => {
        const dateMap = {};

        logs.forEach(({ createdAt, isPublic }) => {
            const date = new Date(createdAt).toISOString().split('T')[0];

            if (!dateMap[date]) {
                dateMap[date] = { date, public: 0, private: 0 };
            }

            if (isPublic) dateMap[date].public += 1;
            else dateMap[date].private += 1;
        });

        return Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const now = new Date();

    const hourlyData = groupByHour(
        logs.filter(log => new Date(log.createdAt) >= new Date(now.getTime() - 24 * 60 * 60 * 1000))
    );

    const dailyData = groupByDay(
        logs.filter(log => new Date(log.createdAt) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))
    );

    const monthlyData = groupByDay(
        logs.filter(log => new Date(log.createdAt) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
    );

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClickOpen}
                sx={{ width: { xs: '100%', sm: '75%' } }}
            >
                {isLoading ? <CircularProgress size={20} /> : 'View Charts'}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        m: 'auto',
                        mt: 8,
                        width: '90%',
                        maxWidth: 1000,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 4,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                        Playlist Usage Overview
                    </Typography>

                    {logs.length === 0 ? (
                        <Typography>No data available.</Typography>
                    ) : (
                        <>
                            <Typography variant="subtitle1" mt={2}>Rolling 24-Hour Usage</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={hourlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hour" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="public" stroke="#8884d8" name="Public" />
                                    <Line type="monotone" dataKey="private" stroke="#82ca9d" name="Private" />
                                </LineChart>
                            </ResponsiveContainer>

                            <Typography variant="subtitle1" mt={5}>Rolling 7-Day Usage</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="public" stroke="#8884d8" name="Public" />
                                    <Line type="monotone" dataKey="private" stroke="#82ca9d" name="Private" />
                                </LineChart>
                            </ResponsiveContainer>

                            <Typography variant="subtitle1" mt={5}>Rolling 30-Day Usage</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="public" stroke="#8884d8" name="Public" />
                                    <Line type="monotone" dataKey="private" stroke="#82ca9d" name="Private" />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default AdminUsageOverview;