import React from 'react'
// import "./sidebar.css"
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
        width :'20vw',
        marginTop : '9vh',
        position: 'fixed',
        height: '100vh',
        zIndex : '100',
        overflowY : 'scroll'
    },
    listIcon: {
        // display : 'flex',    
        marginLeft : '4%',
        padding: '4% 0 4% 0',


    },
    btn : {
        margin : '20px 30px 30px 20px',
        backgroundColor : 'rgb(68, 68, 68)'
    }
    


}))

function Sidebar() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.sidebar}>
            <nav >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push("/")}>
                            <ListItemIcon className={classes.listIcon}>
                                <RssFeedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Feed" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon className={classes.listIcon}>
                                <PlayCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Vedios" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push("/chat")}>
                            <ListItemIcon className={classes.listIcon}>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon className={classes.listIcon}>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon className={classes.listIcon}>
                                <BookmarkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bookmark" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon className={classes.listIcon}   >
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon className={classes.listIcon}   >
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Button variant="contained" className={classes.btn}>Show More</Button>
            <Divider />
            
            <Closefriend/>
        
          
        </div>
    )
}

export default Sidebar
