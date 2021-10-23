import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>({
    paper : {
       
    }
}))

export default function TemporaryDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();


  const list = () => (
    <Box sx={{ width: 250 , backgroundColor : '#dde1e7', height : '100vh'}} role="presentation">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return !openDrawer ? (
    <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
      <DehazeIcon style={{color : 'white'}}/>
    </IconButton>
  ) : (
    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} className={classes.paper} >
       {list()}
    </Drawer>
  );
}
