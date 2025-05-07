import React, { useState } from 'react';
import { Link as RouterLink} from "react-router-dom";
import { Box, Button, TextField, Typography, CircularProgress, Link } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import Footer from "./Footer.jsx";
import DateSelectionForm from "../Forms/DateSelectionForm.jsx";
import AlertHandler from "./AlertHandler.jsx";

function TimeTravel() {
    const [error, setError] = useState('');

    const handleError = (errorMessage) => {
        setError(errorMessage);
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
                component={RouterLink}
                to="/help"
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
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Enter a date below and have a playlist created with the top charting songs from that date!
                </Typography>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <DateSelectionForm onError={handleError}/>
                </Box>

                <AlertHandler alertMessage={error} />

                <Footer />

            </Box>
        </Box>
    );
}

export default TimeTravel;