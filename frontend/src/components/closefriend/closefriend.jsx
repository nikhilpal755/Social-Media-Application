import React, { useEffect, useContext, useState } from 'react'
import axios from "axios"
import { Avatar } from '@mui/material'
import { ListItemButton, List } from '@mui/material';
import { AuthContext } from "../../context/authContext"
import { Link } from 'react-router-dom';
// dummy data

function Closefriend() {

    const { user } = useContext(AuthContext);

    const [friends, setFriends] = useState([]);

    // geting friend list
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/users/friends/${user._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFriends();
       
    }, [user]);

    return (
        <>
            <List >

                {friends.map((f) => {
                    return (

                        <Link to={`/profile/${f.username}`} style={{ display: 'flex', textDecoration :'none', color: 'black', marginBottom: 20}}>
                            <ListItemButton >

                                <Avatar src={f.profilePicture} style={{marginRight : 10}}/>
                                <p variant="h6" >{f.username}</p>
                            </ListItemButton>
                        </Link>


                    )

                })}
            </List>
        </>
    )
}

export default Closefriend
