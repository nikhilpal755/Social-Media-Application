import React,{useEffect, useState} from "react"
import { ListItem, Avatar, ListItemButton} from "@mui/material"
import axios from "axios";

export default function Conversations({conversation , loginUser}) {
    const [friend , setFriend] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    // LoginUser conversations 
    useEffect(() => {
        const friendId = conversation.members.filter((id) => id !== loginUser._id );

        const getFriend = async ()=>{
            try{
                const res = await  axios(`/users?userId=${friendId}`);
                // console.log(res.data);
                setFriend(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getFriend();
    }, [conversation , loginUser])

    return (
        <>
            <ListItem sx={{padding: 0, marginBottom: 2}}>
                <ListItemButton>
                    <Avatar alt="" src={friend ? friend.profilePicture : PF+'person/noavtaar.png'} />
                    <span style={{ marginLeft: 10 }}> {friend ? friend.username : ""}</span>
                </ListItemButton>
            </ListItem>
          

        </>
    )
}

