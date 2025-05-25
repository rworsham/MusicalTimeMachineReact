import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Box, CircularProgress, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { adminApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';
import SongDataDateForm from '../Forms/SongDataDateForm';

const AdminSongData = () => {
    const [dateFormOpen, setDateFormOpen] = useState(false);
    const [dataDialogOpen, setDataDialogOpen] = useState(false);
    const [chartDate, setChartDate] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showError } = useAlert();

    const handleClickOpen = () => {
        setDateFormOpen(true);
    };

    const handleDateSelected = async (selectedDate) => {
        setChartDate(selectedDate);
        setDataDialogOpen(true);
        setSongs([]);
        setLoading(true);

        try {
            const response = await adminApi.get('/song-data', {
                params: { date: selectedDate }
            });
            setSongs(response.data);
        } catch (error) {
            console.error(error);
            showError('Failed to load song data');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'artist', headerName: 'Artist', flex: 1 },
        { field: 'uri', headerName: 'URI', flex: 1 },
        { field: 'chartDate', headerName: 'Chart Date', flex: 1 }
    ];

    return (
        <>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClickOpen}
                    sx={{ width: { xs: '100%', sm: '75%' } }}
                >
                    View Song Data
                </Button>

                <SongDataDateForm
                    open={dateFormOpen}
                    onClose={() => setDateFormOpen(false)}
                    onSelectDate={handleDateSelected}
                />
            </Box>

            <Dialog open={dataDialogOpen} onClose={() => setDataDialogOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>Song Data for {chartDate}</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : songs.length > 0 ? (
                        <Box sx={{ height: 500, mt: 2 }}>
                            <DataGrid
                                rows={songs}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                getRowId={(row) => row.id}
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2 }}>No songs found for this date.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDataDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminSongData;