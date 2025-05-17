import React, { useState } from 'react';
import {Box, Button, CircularProgress, Typography, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {publicApi} from "../context/AuthContext.jsx";
import { useAlert } from '../context/AlertContext.jsx';

const getNearestMonday = (date) => {
    const dayOfWeek = date.day();
    if (dayOfWeek === 1) return date.format('YYYY-MM-DD');
    const diffToMonday = (dayOfWeek === 0) ? 1 : (dayOfWeek - 1);
    return date.add(diffToMonday, 'day').format('YYYY-MM-DD');
};

const DateSelectionForm = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [isPublic, setIsPublic] = useState(true);
    const { showError, showSuccess } = useAlert();

    const validateForm = () => {
        if (!date || !dayjs(date).isValid()) {
            showError("Please enter a valid date");
            return false;
        }

        const minDate = dayjs('1960-01-01');
        const now = dayjs();

        if (date.isBefore(minDate) || date.isAfter(now)) {
            showError("Date must be between 1960 and today");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const nearestMonday = getNearestMonday(date);

        try {
            await publicApi.get('/playlist',{
                params: {
                    date: nearestMonday,
                    isPublic,
                }
            });
            showSuccess('Playlist Created!');
            onSuccess();
        } catch (error) {
            console.error(error);
            showError("Failed to create playlist, please try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                width: '100%',
                mt: 4
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: { xs: '100%', sm: '75%' } }}>
                    <DatePicker
                        label="Select a Date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        sx={{ width: '100%' }}
                    />
                </Box>
            </LocalizationProvider>

            <FormControl sx={{ width: { xs: '100%', sm: '75%' }, alignItems: 'center' }}>
                <FormLabel id="public-radio-group-label" sx={{ mb: 1, alignSelf: 'center' }}>
                    Playlist Visibility
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="public-radio-group-label"
                    name="public-radio-buttons"
                    value={isPublic ? 'true' : 'false'}
                    onChange={(e) => setIsPublic(e.target.value === 'true')}
                    sx={{ justifyContent: 'center', width: '100%' }}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Public" />
                    <FormControlLabel value="false" control={<Radio />} label="Private" />
                </RadioGroup>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={isSubmitting || !date}
                sx={{
                    width: { xs: '100%', sm: '75%' }
                }}
            >
                Get Playlist
            </Button>

            {isSubmitting && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>Creating Playlist...</Typography>
                    <CircularProgress size={24} color="info" />
                </Box>
            )}
        </Box>
    );
};

export default DateSelectionForm;