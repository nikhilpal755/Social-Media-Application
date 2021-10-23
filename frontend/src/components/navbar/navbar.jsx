
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';

import { Button, IconButton, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import DehazeIcon from '@mui/icons-material/Dehaze';
import { Avatar } from "@mui/material";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { AuthContext } from "../../context/authContext";
import TempararyDrawer from "../../components/Drawer/drawer"
import { useContext, useState } from "react";
import NavbarMenu from "./navbarmenu";
import { StyledBadge } from "./navbarmenu";





export default function Navbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const [openSlider, setOpenSlider] = useState(false);
    
    const mediaLessthanmd = useMediaQuery('(max-width : 1100px)');
    const mediaLessthansm = useMediaQuery('(max-width : 800px)');


    const handleLogoutClick = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    }
    return (
        <>
            <div className="nav-container">
                <div className="nav-left" style={{ display: 'flex' }}>
                    {mediaLessthanmd && !openSlider && (
                        <IconButton onClick={() => setOpenSlider(!openSlider)}><DehazeIcon style={{ color: "white" }} /></IconButton>)}
                    {openSlider && mediaLessthanmd && (
                        <TempararyDrawer />
                    )
                    }
                    <Link to="/" style={{ textDecoration: "none", textShadow: "3px 3px blue", marginLeft: '10%' }}>
                        <span className="logo">SocioNik</span>
                    </Link>
                </div>
                {!mediaLessthansm &&
                <div className="nav-center">
                    <Paper
                        component="form"
                        sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: '70%', ml: "20%" }}

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
                }           
                <div className="nav-right">

                    <div className="nav-icons">
                        <StyledBadge badgeContent={12} color="secondary" style={{padding : '0'}}>
                             <NavbarMenu/>
                        </StyledBadge>
                    </div>
                    <Avatar src={user.profilePicture || PF + "person/noavtaar.png"} alt="" onClick={() => history.push(`/profile/${user.username}`)} style={{ marginRight: '10%', cursor: 'pointer' }} />
                    <Button color="success" style={{ backgroundColor: "whitesmoke", marginRight: 15 }} onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </div>
            </div>

        </>
    )
}
