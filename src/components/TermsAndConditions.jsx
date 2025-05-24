import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const TermsAndConditions = () => {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom>
                Terms and Conditions
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Effective Date: May 23, 2025
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    1. Acceptance of Terms
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    By using Musical Time Machine (the “App”), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the App.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    2. Description of the App
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Musical Time Machine is a web-based app that uses Spotify’s API to allow users to create and manage playlists based on selected themes or time periods. You must have an active Spotify account to use the App.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    3. User Responsibilities
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    You agree to use the App in compliance with all applicable laws and Spotify’s <Link href="https://www.spotify.com/legal/end-user-agreement/" target="_blank" rel="noopener">End User Agreement</Link>. You must not misuse the App or use it for any unauthorized or unlawful purposes.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    4. Spotify Integration Disclaimer
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    This App uses Spotify’s API but is not endorsed, certified, or otherwise approved by Spotify. All Spotify trademarks and data remain the property of Spotify AB.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    5. Intellectual Property
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    All content and branding of Musical Time Machine (excluding Spotify-provided assets) are the intellectual property of the App creator. You may not reproduce, distribute, or create derivative works from any part of the App without permission.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    6. Termination
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We reserve the right to suspend or terminate access to the App at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users of the App.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    7. Limitation of Liability
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    The App is provided “as is” without warranties of any kind. We are not responsible for any damages arising from your use of the App, including loss of data, Spotify account issues, or third-party service interruptions.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    8. Changes to These Terms
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We may update these Terms from time to time. Continued use of the App after any changes constitutes your acceptance of the updated Terms.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    9. Contact
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    If you have any questions about these Terms, please contact us at: <strong>support@musicaltimemachine.com</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
