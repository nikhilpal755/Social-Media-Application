
import Navbar from "../../components/navbar/navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"
import { Grid, useMediaQuery } from "@mui/material"
import "./home.css" 

export default function Home() {
    const mediaLessthanmd = useMediaQuery('(max-width: 900px)');
    console.log(mediaLessthanmd);
    return (
        <div>
           <Navbar/>
           <div className="homecontainer">
               { !mediaLessthanmd && <Sidebar/>}
               <div className="scrolling">
                   <Grid item xs={6} md={8}>
                        <Feed/>
                   </Grid>
                   <Grid item xs={6} md={4}>
                        <Rightbar/>
                   </Grid>
               </div>
           </div>
        </div>
    )
}
 