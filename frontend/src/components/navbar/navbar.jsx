
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
import { useContext, useState , useRef} from "react";
import NavbarMenu from "./navbarmenu";
import { StyledBadge } from "./navbarmenu";

import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(() =>({
    navContainer :{
        height : '70px',
        width : '100%',
        backgroundColor: "#101328",
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex : 999
    },

    navLeft : {
        display : 'flex',
        flex : 3
    },

    logo : {
        fontSize : '1.8rem',
        marginLeft : '10%',
        fontWeight : 'bold',
        color : 'whitesmoke', 
        cursor: 'pointer'
    },
    navCenter : {
        flex : '5'
    },
    navRight :{
        flex : '4',
        display : 'flex',
        alignItems :'cente',
        justifyContent : "flex-end",
        color : 'white'
    },
    navIcons : {
        display :'flex',
        marginLeft : '10%'        
    }



}))





export default function Navbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const [openSlider, setOpenSlider] = useState(false);
    const search = useRef();
    const classes = useStyles();
    
    const mediaLessthanmd = useMediaQuery('(max-width : 1100px)');
    const mediaLessthansm = useMediaQuery('(max-width : 800px)');


    const handleLogoutClick = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    const handleSearchClick = (e) =>{
        // find friends
        e.preventDefault();
        history.push(`profile/${search.current.value}`)
        search.current.value ="";
        return;
    }
    return (
        <>
            <div className={classes.navContainer}>
                <div className={classes.navLeft} >
                    {mediaLessthanmd && !openSlider && (
                        <IconButton onClick={() => setOpenSlider(!openSlider)}><DehazeIcon style={{ color: "white" }} /></IconButton>)}
                    {openSlider && mediaLessthanmd && (
                        <TempararyDrawer />
                    )
                    }
                    <Link to="/" style={{ textDecoration: "none", textShadow: "3px 3px purple", marginLeft: '10%' }}>
                        <span className={classes.logo}>SocioNik</span>
                    </Link>
                </div>
                {!mediaLessthansm &&
                <div className={classes.navCenter}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: '70%', ml: "20%" }}

                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search for Friends, Vedios and More"
                            inputRef={search}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} onClick={handleSearchClick}>
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                </div>  
                }           
                <div className={classes.navRight}>

                    <div className={classes.navIcons}>
                        <StyledBadge badgeContent={12} color="secondary" style={{padding : 0,marginRight: 20}}>
                             <NavbarMenu/>
                        </StyledBadge>
                    </div>
                    <Avatar src={user.profilePicture || PF + "person/noavtaar.png"} alt="" onClick={() => history.push(`/profile/${user.username}`)} style={{ marginRight: '5%', cursor: 'pointer' }} />
                    <Button color="success" style={{ backgroundColor: "whitesmoke", marginRight: 15 }} onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </div>
            </div>

        </>
    )
}
