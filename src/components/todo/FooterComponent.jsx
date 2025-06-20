import React from 'react'
import { Box, Container, Typography, Link } from '@mui/material'

function FooterComponent() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com">
                        TodoApp
                    </Link>{' '}
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    )
}

export default FooterComponent