import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

type UserMenuProps = {
    user: UserModel
}

function UserMenu(props: UserMenuProps): JSX.Element {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        authService.logout().then().catch(err => notifyService.error(err));
    };

    return (

        <>
            {props.user &&
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="User settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={`${props.user.firstName} ${props.user.lastName}`} src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                        <MenuItem key='logout' onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>

                    </Menu>
                </Box>}
        </>
    )

}

export default UserMenu;