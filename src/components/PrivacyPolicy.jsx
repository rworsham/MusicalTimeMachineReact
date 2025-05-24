import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom>
                Privacy Policy for Musical Time Machine
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Effective Date: May 23, 2025
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    1. Information We Access
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    When you log in to Musical Time Machine using your Spotify account, we temporarily access the following information through Spotify's secure OAuth process:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography>Spotify account ID</Typography></li>
                    <li><Typography>Permission to create and modify playlists on your behalf</Typography></li>
                </Box>
                <Typography sx={{ mb: 2 }}>
                    We do <strong>not</strong> access your email address, followers, listening history, or other personal information unless explicitly required by Spotify for the functionality described.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    2. How We Use Your Information
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We only use your Spotify account authorization to:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography>Authenticate your identity via Spotify</Typography></li>
                    <li><Typography>Create a playlist in your account</Typography></li>
                    <li><Typography>Add songs to that playlist</Typography></li>
                </Box>
                <Typography sx={{ mb: 2 }}>
                    No user data is stored on our servers or shared with third parties.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    3. Data Storage
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We do <strong>not</strong> store any personally identifiable information or Spotify data. All access is session-based and expires after logout or token expiration.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    4. Data Sharing
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We do not share, sell, or transfer any user data to third parties.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    5. Your Control
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    You may revoke our app’s access to your Spotify account at any time via your{' '}
                    <Link href="https://www.spotify.com/account/apps/" target="_blank" rel="noopener">
                        Spotify Account Settings
                    </Link>.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    6. Children’s Privacy
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    This app is not intended for users under the age of 13.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    7. Changes to This Policy
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    8. Contact
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    If you have any questions about this policy, please contact us at: <strong>support@musicaltimemachine.com</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
