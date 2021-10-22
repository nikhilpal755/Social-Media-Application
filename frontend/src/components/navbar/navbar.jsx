frontend/src/components/feed/Feed.jsx
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';


import { Button, IconButton, useMediaQuery} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import TempararyDrawer from "../../components/Drawer/drawer"
import DehazeIcon from '@mui/icons-material/Dehaze';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));




export default function Navbar() {
    const {user} =  useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const mediaLessthanmd = useMediaQuery('(max-width : 900px)');
    const [openSlider, setOpenSlider] = useState(false);

    
   

    const handleLogoutClick =() =>{
        localStorage.removeItem("user");
        window.location.href = "/";
    }
    return (
        <>
            <div className="nav-container">
                <div className="nav-left" style={{display : 'flex'}}>
                    {mediaLessthanmd && !openSlider && (
                    <IconButton onClick={() => setOpenSlider(!openSlider)}><DehazeIcon style={{color : "white"}}/></IconButton> )}
                    {openSlider && mediaLessthanmd && (
                        <TempararyDrawer/>
                    )
                    }
                    <Link to="/" style={{textDecoration:"none",textShadow: "3px 3px blue",}}>
                         <span className="logo">SocioNik</span>
                    </Link>
                </div>
                <div className="nav-center">
                    <Paper
                        component="form"
                        sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: 400, ml: 20 }}

                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search for Friends, Vedios and More"
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                </div>
                <div className="nav-right">
                    
                    <div className="nav-icons">
                        <IconButton >
                            <StyledBadge badgeContent={4} color="secondary">
                                <PersonIcon className="icon" />
                            </StyledBadge>
                        </IconButton>
                        <IconButton >
                            <StyledBadge badgeContent={5} color="secondary">
                                <NotificationsIcon className="icon" />
                            </StyledBadge>
                        </IconButton>
                        <IconButton >
                            <StyledBadge badgeContent={10} color="secondary">
                                <ChatIcon className="icon" />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <img src={user.profilePicture || PF+"person/noavtaar.png"} alt="" className="navbarImg" onClick={() => history.push(`/profile/${user.username}`) } />
                    <Button color="success" style={{backgroundColor:"whitesmoke" , marginRight: 15}} onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </div>
            </div>

        </>
    )
}
