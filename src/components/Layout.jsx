import React, { useState } from 'react';
import { Box, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Footer from "./Footer.jsx";
import AlertHandler from "./AlertHandler.jsx";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        window.open("https://github.com/rworsham", "_blank");
        setOpen(false);
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
            <Link
                component="button"
                onClick={handleOpen}
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Leaving This Site</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You’re about to visit an external development site (GitHub). Do you want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

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
                {children}
            </Box>

            <Footer />

            <AlertHandler />
        </Box>
    );
}

export default Layout;