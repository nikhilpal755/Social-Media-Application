import React,{useContext} from 'react'
import "./rightbar.css"
import Users from '../Followusers/users';
import {Typography} from "@mui/material"

import { AuthContext } from '../../context/authContext';

function Rightbar() {

   

    return (
        <div className="rightbar">
            <div className="rightBarTop">

                <Typography variant='h6' component="h4"> People you may know</Typography>
                <div className="friendsList">

                    <Users />
                     
                </div>

            </div>
            <div className="rightBarBottom">

                <img className="rightbarAd" src="assets/adthree.png" alt="" />
                <img className="rightbarAd" src="assets/add.png" alt="ads" />

            </div>

        </div>
    )
}

export default Rightbar

