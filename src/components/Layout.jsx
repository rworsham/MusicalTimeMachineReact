import React from 'react';
import { Link as RouterLink} from "react-router-dom";
import { Box, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import Footer from "./Footer.jsx";
import AlertHandler from "./AlertHandler.jsx";

const Layout = ({ children }) => {
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
                {children}
            </Box>

            <Footer />

            <AlertHandler/>

        </Box>
    );
}

export default Layout;