import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LogoutComponent from "./LogoutComponent"
import HeaderComponent from "./HeaderComponent"
import ListTodosComponent from "./ListTodosComponent"
import ErorrComponent from "./ErrorComponent"
import WelcomeComponent from "./WelcomeComponent"
import LoginComponent from "./LoginComponent"
import TodoComponent from "./TodoComponent"
import AuthProvider, { useAuth } from "./security/AuthContext"

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
    },
});

export default function TodoApp() {
    function AuthenticatedRoute({ children }) {
        const authContext = useAuth()
        if (authContext.isAuthenticated) {
            return children
        }
        return <Navigate to="/" />
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <Box sx={{ 
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'background.default'
                    }}>
                        <HeaderComponent />
                        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<LoginComponent />} />
                                <Route path="/login" element={<LoginComponent />} />
                                <Route path="/welcome/:username" element={
                                    <AuthenticatedRoute>
                                        <WelcomeComponent />
                                    </AuthenticatedRoute>
                                } />
                                <Route path="/todos" element={
                                    <AuthenticatedRoute>
                                        <ListTodosComponent />
                                    </AuthenticatedRoute>
                                } />
                                <Route path="/todo/:id" element={
                                    <AuthenticatedRoute>
                                        <TodoComponent />
                                    </AuthenticatedRoute>
                                } />
                                <Route path="/logout" element={
                                    <AuthenticatedRoute>
                                        <LogoutComponent />
                                    </AuthenticatedRoute>
                                } />
                                <Route path="*" element={<ErorrComponent />} />
                            </Routes>
                        </Container>
                    </Box>
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer position="bottom-right" />
        </ThemeProvider>
    )
}












