import React, { useState, useEffect } from 'react'

import Navbar from "../../components/navbar/navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import ProfileInfo from "../../components/profileInfo/profileinfo"
import EditProfile from '../../components/Settings/EditProfile'

import { Button, Grid} from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router'

import { useMediaQuery } from '@mui/material'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react'



import "./profile.css"


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const userName = useParams().username;
    const { user: loginUser } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);



    const mediaLessthanmd = useMediaQuery('(max-width : 1100px)');
    // const mediaLessthansm = useMediaQuery('(max-width : 800px)');
   


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${userName}`);
            // console.log(res.data);
            setUser(res.data);
        }
        fetchUser();
    }, [userName])

  


    return (
        <div>
            <Navbar />
            <div className="profile">
                {!mediaLessthanmd && <Sidebar />}
                <div style={{
                    flex: !mediaLessthanmd ? '9' : '12',
                    marginLeft: !mediaLessthanmd ? '20vw' : '0vw',
                    marginTop: '2.5vw'
                }}>

                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture || `${PF}person/nocover.png`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture || `${PF}person/noavtaar.png`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName" >{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                            {loginUser._id === user._id && <Button onClick={() => setOpenModal(true)} variant="contained" color="secondary" > Edit profile</Button>}

                            {openModal && <EditProfile openModal={openModal} setOpenModal={setOpenModal} loginUser={loginUser}/> }
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Grid item xs={12}>
                            <ProfileInfo user={user} />

                        </Grid>
                        {/* <hr/> */}
                        
                        <Grid item xs={12} >
                            <Feed username={userName} />
                        </Grid>
                    </div>
                </div>

            </div>
        </div>
    )
}
