import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from "@mui/material/styles"
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Badge from "@mui/material/Badge";
import { IconButton } from '@mui/material';





export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function NavbarMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon style={{ color: 'white' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
               
                <MenuItem onClick={handleClose}>
                        <p>Friends</p>
                        <IconButton >
                            <StyledBadge badgeContent={4} color="secondary">
                                <PersonIcon style={{ color: 'black' }} />
                            </StyledBadge>
                        </IconButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <p>Notifications</p>
                    <IconButton >
                        <StyledBadge badgeContent={4} color="secondary">
                            <NotificationsIcon style={{ color: 'black' }} />
                        </StyledBadge>
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <p>Messages</p>
                    <IconButton >
                        <StyledBadge badgeContent={4} color="secondary">
                            <ChatIcon style={{ color: 'black' }} />
                        </StyledBadge>
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    );
}