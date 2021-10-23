
import Navbar from "../../components/navbar/navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"
import { Grid, useMediaQuery } from "@mui/material"
import "./home.css" 

export default function Home() {
    const mediaLessthanmd = useMediaQuery('(max-width: 1100px)');
    const mediaLessthansm = useMediaQuery('(max-width: 800px)')
    console.log(mediaLessthanmd);
    return (
        <div>
           <Navbar/>
           <div className="homecontainer">
               { !mediaLessthanmd && <Sidebar/>}
               <div style={{display: 'flex' , width : '100%' , height : '100%', marginLeft:!mediaLessthanmd && '17vw' }} >
                   <Grid item xs={!mediaLessthansm ? 8: 12}>
                        <Feed/>
                   </Grid>
                   <Grid item  xs={!mediaLessthansm ? 4 : 0}>
                       {!mediaLessthansm && <Rightbar/>}
                   </Grid>
               </div>
           </div>
        </div>
    )
}
 