import React, { useState } from 'react';
import { Box, Typography,} from '@mui/material';
import DateSelectionForm from "../Forms/DateSelectionForm.jsx";
import PlaylistCreated from './PlaylistCreated.jsx';

function TimeTravel() {
    const [formSuccess, setFormSuccess] = useState(false);

    const handleSuccess = () => {
        setFormSuccess(true);
    };

    const handleReset = () => {
        setFormSuccess(false);
    };

    return formSuccess ? (
        <PlaylistCreated onReset={handleReset} />
    ) : (
        <>
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
                <DateSelectionForm
                    onSuccess={handleSuccess}
                />
            </Box>
        </>
    );
}

export default TimeTravel;