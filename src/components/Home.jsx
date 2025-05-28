import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Home() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    return (
        <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
                Musical Time Machine using Spotify®!
            </Typography>
            <Typography variant="body1">
                Discover new genres and rediscover old classics! This application will create a playlist of the top charting hits from 1960 to today.
            </Typography>
            <Typography variant="body1">
                All of this is possible with the Musical Time Machine!
            </Typography>

            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    color="info"
                    size="large"
                    onClick={handleOpenModal}
                    sx={{ fontStyle: 'italic' }}
                >
                    Get Started!
                </Button>

                <Typography
                    variant="caption"
                    sx={{ mt: 2, fontStyle: 'italic', color: 'gray.300', textAlign: 'center' }}
                >
                    Powered by Spotify® – This app is not affiliated with or endorsed by Spotify.
                </Typography>
            </Box>

            <Dialog
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="auth-dialog-title"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontStyle="italic" gutterBottom>
                        To use this application, you must log in with your Spotify® account. Authentication is required to generate playlists based on historical chart data for the date you select.
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        No personal data is stored, saved, or used beyond what is necessary to create the playlist.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        href="https://musicaltimemachinejavasb.onrender.com/api/auth/login"
                        variant="contained"
                        color="info"
                        sx={{ width: 150 }}
                    >
                        Log In!
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Home;