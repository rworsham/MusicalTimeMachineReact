import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useAlert } from '../context/AlertContext.jsx';

const getNearestMonday = (date) => {
    const dayOfWeek = date.day();
    if (dayOfWeek === 1) return date.format('YYYY-MM-DD');
    const diffToMonday = (dayOfWeek === 0) ? 1 : (1 - dayOfWeek);
    return date.add(diffToMonday, 'day').format('YYYY-MM-DD');
};

const SongDataDateForm = ({ open, onClose, onSelectDate }) => {
    const [date, setDate] = useState(dayjs());
    const { showError } = useAlert();

    const handleSubmit = () => {
        if (!date || !dayjs(date).isValid()) {
            showError('Please select a valid date.');
            return;
        }

        const minDate = dayjs('1960-01-01');
        const maxDate = dayjs();
        if (date.isBefore(minDate) || date.isAfter(maxDate)) {
            showError('Date must be between 1960 and today.');
            return;
        }

        const nearestMonday = getNearestMonday(date);
        onSelectDate(nearestMonday);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Select Chart Date</DialogTitle>
            <DialogContent>
                <Box mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Choose a date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            disableFuture
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SongDataDateForm;