import React, { useContext, useRef, useState, useEffect } from 'react'
import { TextField, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material'

import axios from 'axios'
import {io} from 'socket.io-client'


import Navbar from '../../components/navbar/navbar'
import Conversations from '../../components/Conversations/conversations'
import Online from '../../components/online/Online'
import Message from '../../components/message/message'


import { AuthContext } from '../../context/authContext';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const useStyles = makeStyles(() => ({
    chatContainer: {
        height: "90.5vh",
        marginTop: "9.5vh",
        display: 'flex'
    },

    chatBox: {
        flex: '6',
        height: '100%',
        backgroundColor : '#111b25'
    },

    converstationWrapper: {
        padding: '2%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    inputFriend: {
        width: '100%',
    },
    chatBoxTop: {
        height: '80vh',
        overflowY : 'scroll',
        paddingRight: 10,
        paddingLeft: 10,
        scrollBehavior : 'smooth'

    },
    chatBoxBottom: {

        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between'


    },
    sendMessage: {
        width: '85%',
        color: 'white',
        backgroundColor: 'white',
        border: 'none'
    },
    sendMessageButton: {
        color: 'white',
        backgroundColor: 'blue'
    }

}))


export default function Chat() {

    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const newMessage = useRef();
    const scrollRef = useRef();

    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage , setarrivalMessage] = useState(null)

    const [onlineUsers , setOnlineUsers] = useState([]);
    const mediaLessthanmd = useMediaQuery('(max-width: 900px)')
// ------------------------ Socket IO part -----------------------------------------
    const socket = useRef();

    // connecting and getting new messages
    useEffect(() => {
     socket.current = io("ws://localhost:8888")
     socket.current.on("getMessage", (data) =>{
         setarrivalMessage({
             sender : data.senderId,
             text : data.text,
             createdAt : Date.now()
         })
     })
    }, [])

    // connect , disconnect , and online users
    useEffect(()=>{
        socket.current.emit("addUser" ,user._id);
        socket.current.on("getUsers" , (users) =>{
            console.log(users);
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f))
            )
        })
    },[user]);

    // handlling new messages
    useEffect(() =>{
        arrivalMessage && currentChat &&
        currentChat.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev ,arrivalMessage])

    },[arrivalMessage , currentChat])

// -------------------------------------------------------------------------



    // fetching loginUser conversations
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${user._id}`)
                // console.log(res.data);
                setConversation(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user._id])

    // fetching conversations messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentChat._id}`);
                // console.log(res.data);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat])

    // scroll to end 
    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    // creating or handling new messages

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const message = {
            sender : user._id,
            text : newMessage.current.value,
            conversationId : currentChat._id
        }

        const recieverId = currentChat.members.find((m) => m !== user._id);

        socket.current.emit("sendMessage" , {
            senderId : user._id,
            recieverId,
            text : newMessage.current.value
        })
        try{
            const res = await axios.post('/messages' , message);
            setMessages([...messages, res.data]);
            newMessage.current.value="";
        }catch(err){
            console.log(err);
        }

        
    }

    return (
        <div>
            <Navbar />
            <div className={classes.chatContainer}>
                <div style={{height: '100%',flex: !mediaLessthanmd ? '3': '2'}}>
                    <div className={classes.converstationWrapper}>
                        <TextField id="filled-basic" label="Search for friends" variant="filled" className={classes.inputFriend} style={{ marginTop: 10, marginBottom: 30 }}></TextField>
                        {conversation && conversation.map(conv => {
                            return (
                                <div onClick={() => setCurrentChat(conv)}>
                                    <Conversations conversation={conv} loginUser={user} />
                                </div>
                            )

                        })}

                    </div>
                </div>
                <div className={classes.chatBox}>
                    {currentChat ? (
                        <>
                            <div className={classes.chatBoxTop}>

                                {messages.map((m) => {
                                    // console.log(m);
                                    return (<div ref={scrollRef}>
                                        <Message message={m} own={m.sender === user._id} />
                                    </div>)
                                })

                                }
                            </div>
                            <div className={classes.chatBoxBottom}>
                                
                                <TextField id="outlined-basic" variant="outlined"  className={classes.sendMessage} inputRef={newMessage} sx={{ ml: '2%' }} ></TextField>

                                <Button variant="contained" style={{ height: '7.5vh' }} className={classes.sendMessageButton} onClick={handleSubmit}><SendIcon /></Button>
                            </div>
                        </>
                    ) : (
                        <span className="noConversations" style={{ color: 'whitesmoke' }}>
                            Open a Conversations to start a chat...
                        </span>
                    )}


                </div>
                <div style={{ flex:!mediaLessthanmd ? '3' : '0',height: '100%',}}>
                    {!mediaLessthanmd && <Online user={user} />}

                </div>
            </div>

        </div>
    )
}