
import Navbar from "../../components/navbar/navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"
import { Grid } from "@mui/material"
import "./home.css" 
export default function home() {
    return (
        <div>
           <Navbar/>
           <div className="homecontainer">
               <Sidebar className="sideBar"/>
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
 