import React,{useEffect, useState} from 'react'
import { format } from 'timeago.js'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'


const useStyles = makeStyles(() => ({
   
    messageContainer: {
        display: 'flex'
    },

    ownMessageBottom: {
        fontSize: '70%',
        marginTop: '10',
        marginRight : '5%',
        color : 'cyan'
    },
    messageBottom : {
        fontSize : '70%',
        marginTop : '10',
        marginLeft : '5%',
        color : 'cyan'
    },
    ownMessage: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10
    },


    message: {
        display : 'flex',
        width: '100%',
        flexDirection : 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop : 10
    },
    ownMessageText: {
        padding: 10,
        backgroundColor: 'black',
        color: 'white',
        maxWidth : '70%',
        borderRadius: '2%',
        marginRight : '5%',
        
    },

    messageText: {
        backgroundColor: 'rgb(245, 241, 241)',
        color: 'black',
        width: 'fit-content',
        maxWidth : '70%',
        borderRadius : '2%',
        padding: 10,
        marginLeft : '5%'

    }
}))
export default function Message({ message, own }) {
    const classes = useStyles();
    const [avtaar, setAvtaar] = useState("");
    // console.log(own);
    useEffect(() =>{
        const getAvtaar = async() =>{
            try{
               const res = await axios.get(`/users?userId=${message.sender}`);
            //    console.log(res.data);
               setAvtaar(res.data.profilePicture);
               
            }catch(err){
                console.log(err);

            }
        }
        getAvtaar();

    },[message])

    // console.log(message, own);
    return (
        <div className={classes.messageContainer}>
            <div className ={ own ? classes.message : classes.ownMessage }>
                <Avatar alt="" src={avtaar}></Avatar>
                <p className={own ? classes.ownMessageText :  classes.messageText}>{message.text}</p>
                 <div className={own ? classes.ownMessageBottom : classes.messageBottom}>{format(message.createdAt)}</div>
            </div>

        </div>
    )
}
