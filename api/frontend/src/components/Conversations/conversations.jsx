import React,{useEffect, useState} from "react"
import { ListItem, Avatar, ListItemButton} from "@mui/material"
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

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

    const handleDeleteConversation = async(e) =>{
        e.preventDefault()
        try{
            await axios.delete(`/conversations/${conversation._id}`)
           console.log('conversation deleted');
           window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <ListItem sx={{padding: 0, marginBottom: 2}}>
                <ListItemButton style={{display : 'flex' , justifyContent : 'space-between'}}>
                    <div style={{display : 'flex'}}>
                        <Avatar alt="" src={friend ? friend.profilePicture : PF+'person/noavtaar.png'} />
                        <span style={{ marginLeft: 10 , marginTop : 10}}> {friend ? friend.username : ""}</span>
                    </div>
                    <div>
                        <IconButton onClick={handleDeleteConversation} > <DeleteIcon style={{color: 'red'}}/></IconButton>

                    </div>
                </ListItemButton>
            </ListItem>
          

        </>
    )
}

