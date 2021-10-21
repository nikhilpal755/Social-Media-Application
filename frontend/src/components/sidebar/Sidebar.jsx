import React from 'react'
import "./sidebar.css"
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


function Sidebar() {
    const history = useHistory();
    return (
        <div className="sidebar">
            <nav >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push("/")}>
                            <ListItemIcon class="listIcon">
                                <RssFeedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Feed" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon class="listIcon">
                                <PlayCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Vedios" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push("/chat")}>
                            <ListItemIcon class="listIcon">
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon class="listIcon">
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon class="listIcon">
                                <BookmarkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bookmark" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon class="listIcon"      >
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon class="listIcon"      >
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Button variant="contained" id="btn">Show More</Button>
            <Divider />
            
            <Closefriend/>
        
          
        </div>
    )
}

export default Sidebar
