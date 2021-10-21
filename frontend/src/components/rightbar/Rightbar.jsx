import React, { useContext } from 'react'
import "./rightbar.css"

// import {Users} from "../../data"
import {AuthContext} from "../../context/authContext"
import Online from '../online/Online'


function Rightbar() {
    const {user} = useContext(AuthContext);
    return (
        <div className="rightbar">
            <div className="rightBarTop">
            
                {/* <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Nikhil</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div> */}

                <h4> Friends Online</h4>
                <div className="friendsList">

                    <Online  user={user}/>
                     
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

