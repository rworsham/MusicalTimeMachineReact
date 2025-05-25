import React, { useState } from 'react';
import {
    Box, Button, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { adminApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const SeedDataForm = () => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showError } = useAlert();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        setIsSubmitting(true);
        try {
            adminApi.post('/seed-song-data');
        } catch (error) {
            console.error(error);
            showError ('Failed to start seeding, please try again.');
        } finally {
            setIsSubmitting(false);
            setOpen(false);
        }
    };

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClickOpen}
                disabled={isSubmitting}
                sx={{ width: { xs: '100%', sm: '75%' } }}
            >
                Seed Song Data
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Seeding</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to start seeding Song data?.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="error" variant="contained" autoFocus disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={20} /> : 'Yes, Seed'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SeedDataForm;
