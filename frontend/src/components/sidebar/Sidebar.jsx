import React from 'react'
//import list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


// importing icons 
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

import Button from "@mui/material/Button"

import Closefriend from '../closefriend/closefriend';
import { useHistory } from 'react-router';
import {makeStyles} from "@mui/styles"
import { useMediaQuery } from '@mui/material';



const useStyles = makeStyles(() =>({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.5em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: ' rgb(68, 68, 68)',
        //   outline: '1px solid grey'
        }
      },
     sidebar : {
        marginTop : '9vh',
        position: 'fixed',
        height: '100vh',
        zIndex : '100',
        overflowY : "scroll",
        backgroundColor : "#dde1e7"
    },
    listIcon : {
        color : 'black',
    },


}))



function Sidebar() {
    const classes = useStyles();
    const history = useHistory();
    const mediaLessthanmd = useMediaQuery('(max-width: 1100px)')
    return (
        <div className={classes.sidebar} style={{  width :mediaLessthanmd ? '40vw' : '20vw', height: '100vh', overflowY: 'scroll'}}>
                <List>
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => history.push("/")}>
                            <ListItemIcon  style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}>
                                <RssFeedIcon  className={classes.listIcon}/>
                            </ListItemIcon>
                            <ListItemText primary="Feed" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}>
                                <PlayCircleOutlineIcon  className={classes.listIcon}/>
                            </ListItemIcon>
                            <ListItemText primary="Vedios" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push("/chat")}>
                            <ListItemIcon style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}} >
                                <ChatIcon className={classes.listIcon}/>
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}>
                                <BookmarkIcon className={classes.listIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Bookmark" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon  style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}>
                                <EventIcon className={classes.listIcon}/>
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{minWidth : '25px',padding: '4% 3% 5% 0',
        marginLeft : '4%',}}   >
                                <SchoolIcon className={classes.listIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItemButton>
                    </ListItem>
                </List>
     
            <Button variant="contained" style={{    margin : "20px 30px 30px 20px",
        backgroundColor : 'rgb(68, 68, 68)'}}>Show More</Button>
            <Divider />
            
                <Closefriend/>
            
        
          
        </div>
    )
}

export default Sidebar
