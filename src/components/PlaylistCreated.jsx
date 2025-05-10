import React from 'react';
import { Box, Button, Typography} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import spotifyLogo from '../assets/Full_Logo_Green_RGB.svg';

function PlaylistCreated({ onReset }) {

    const handleSpotifyRedirect = () => {
        window.open('https://open.spotify.com/', '_blank', 'noopener noreferrer');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Playlist Created!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Your playlist has successfully been created! Create more playlists or go listen to them now with the links below!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={onReset}
                    startIcon={<MusicNoteIcon />}
                    sx={{
                        flex: 1,
                        minWidth: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 1,
                    }}
                >
                    Create Another Playlist
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={handleSpotifyRedirect}
                    sx={{
                        flex: 1,
                        minWidth: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 1,
                        borderColor: '#1DB954',
                        '&:hover': {
                            backgroundColor: 'rgba(29, 185, 84, 0.2)',
                            borderColor: '#1DB954',
                            color: 'white',
                        },
                    }}
                >
                    <img src={spotifyLogo} alt="Spotify logo" style={{ height: 32 }} />
                </Button>
            </Box>
        </Box>
    );
}

export default PlaylistCreated;