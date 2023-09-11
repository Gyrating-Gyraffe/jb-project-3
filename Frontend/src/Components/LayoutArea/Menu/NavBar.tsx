import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthState } from '../../../Redux/AuthState';
import UserMenu from './UserMenu';

type PageLink = {
    name: string,
    url: string
}
const pages: PageLink[] = [
    { name: `Register`, url: `/register` },
    { name: `Login`, url: `/login` }
]

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const user = useSelector((state: AuthState) => state.user);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    {/* MOBILE LAYOUT */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                            onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom', horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top', horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                            {!user && pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" component={NavLink} to={page.url} className='text-link'>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography className='text-link' variant="h5" noWrap component={NavLink} to={"/home"}
                        sx={{
                            mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace',
                            fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'
                        }}
                    >
                        HOME
                    </Typography>

                    {/* DESKTOP LAYOUT */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component={NavLink} to={"/home"}
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'
                        }}
                    >
                        HOME
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {!user && pages.map((page, index) => (
                            <Button component={NavLink} to={page.url} className='text-link'
                                key={index}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* USER MENU */}
                    <UserMenu user={user} />

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;