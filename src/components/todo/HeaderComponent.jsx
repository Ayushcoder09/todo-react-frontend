import { Link, useNavigate } from "react-router-dom"
import { useAuth } from './security/AuthContext'
import React, { useState } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material'
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    CheckCircle as TodoIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    Person as PersonIcon
} from '@mui/icons-material'

function HeaderComponent() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuAnchor, setUserMenuAnchor] = useState(null)
    
    const authContext = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const isAuthenticated = authContext.isAuthenticated
    
    function logout() {
        authContext.logout()
        navigate('/login')
    }

    const handleUserMenuClick = (event) => {
        setUserMenuAnchor(event.currentTarget)
    }

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null)
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const mobileMenuItems = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMobileMenu}>
            <List>
                {isAuthenticated && (
                    <>
                        <ListItem button component={Link} to={`/welcome/${authContext.username}`}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/todos">
                            <ListItemIcon><TodoIcon /></ListItemIcon>
                            <ListItemText primary="Todos" />
                        </ListItem>
                    </>
                )}
            </List>
            <Divider />
            <List>
                {!isAuthenticated ? (
                    <ListItem button component={Link} to="/login">
                        <ListItemIcon><LoginIcon /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                ) : (
                    <ListItem button onClick={logout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                )}
            </List>
        </Box>
    )

    return (
        <AppBar position="sticky" elevation={1} color="default" sx={{ bgcolor: 'background.paper' }}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleMobileMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/"
                    sx={{ 
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 700
                    }}
                >
                    TodoApp
                </Typography>

                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated && (
                            <>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={`/welcome/${authContext.username}`}
                                    startIcon={<HomeIcon />}
                                >
                                    Home
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/todos"
                                    startIcon={<TodoIcon />}
                                >
                                    Todos
                                </Button>
                            </>
                        )}
                        
                        {isAuthenticated ? (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={handleUserMenuClick}
                                    sx={{ ml: 2 }}
                                >
                                    <PersonIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={Boolean(userMenuAnchor)}
                                    onClose={handleUserMenuClose}
                                >
                                    <MenuItem disabled>
                                        <Typography variant="body2" color="textSecondary">
                                            {authContext.username}
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                startIcon={<LoginIcon />}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                )}

                <Drawer
                    anchor="left"
                    open={mobileMenuOpen}
                    onClose={toggleMobileMenu}
                >
                    {mobileMenuItems}
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent