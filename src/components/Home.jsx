import React, { useState } from 'react';
import { Link as RouterLink} from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Link,
    useTheme,
    useMediaQuery
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "./Footer.jsx";

function Home() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

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
            <Link
                href="https://github.com/rworsham"
                target="_blank"
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'white',
                    fontSize: 40,
                    zIndex: 1
                }}
            >
                <GitHubIcon fontSize="inherit" />
            </Link>

            <Link
                component={RouterLink}
                to="/help"
                target="_blank"
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    color: 'white',
                    fontSize: 40,
                    zIndex: 1,
                    textDecoration: 'none'
                }}
            >
                <HelpIcon fontSize="inherit" />
            </Link>

            <Box
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    maxWidth: 700,
                    width: '100%',
                    textAlign: 'center',
                    color: 'white'
                }}
            >
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
            </Box>

            <Footer />

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
                        href="http://localhost:8080/api/auth/login"
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