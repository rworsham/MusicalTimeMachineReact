import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography
} from '@mui/material';
import { publicApi } from '../context/AuthContext.jsx';

const ContactForm = ({ onSuccess, onError }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            onError('Please enter a valid email address');
            return false;
        }
        if (!message || message.trim().length < 10) {
            onError('Message must be at least 10 characters long');
            return false;
        }
        onError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await publicApi.post('/contact', { email, message });
            onSuccess('Thanks for your message!');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error(error);
            onError('Failed to send message. Please try again later.');
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
            <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: { xs: '100%', sm: '75%' } }}
            />

            <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ width: { xs: '100%', sm: '75%' } }}
            />

            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={isSubmitting}
                sx={{ width: { xs: '100%', sm: '75%' } }}
            >
                Send Message
            </Button>

            {isSubmitting && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>Sending...</Typography>
                    <CircularProgress size={24} color="info" />
                </Box>
            )}
        </Box>
    );
};

export default ContactForm;
