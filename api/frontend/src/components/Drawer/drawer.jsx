import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";



export default function TemporaryDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return !openDrawer ? (
    <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
      <DehazeIcon style={{color : 'white'}} />
    </IconButton>
  ) : (
    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} >
       <Sidebar/>
    </Drawer>
  );
}
