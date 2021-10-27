import axios from 'axios'
import React,{useEffect, useState, useContext} from 'react'
import { Avatar, Card, CardContent, Divider } from '@mui/material'
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


export default function Users() {

    const {user : loginUser} = useContext(AuthContext);
    const [users, setUsers] = useState([])
    
    useEffect(() =>{
        const fetchUsers = async()=>{
           const res = await axios.get(`/users/all`);
           console.log(res.data)
           res.data = res.data.filter((user) => user._id !==loginUser._id)
           setUsers(res.data);
        }
        fetchUsers();
    },[])

  
    
    
    return (
        <Card sx={{minWidth : 275, backgroundColor: '#101328', boxShadow : '1px 1px 3px 3px black'}}>
            <CardContent>
            {
                users.map((user) =>{
                    return (
                        <div style={{display : 'flex',marginBottom: '20px',justifyContent: 'space-between'}}>
                            <div className="avtaar" style={{display : 'flex'}}>
                                <Link to={`/profile/${user.username}`}>
                                    <Avatar src={user.profilePicture} alt=""></Avatar>
                                </Link>
                                <Link to={`/profile/${user.username}`} style={{textDecoration : 'none'}}>
                                <   Button fullWidth color="secondary"><p>{user.username}</p></Button> 
                                </Link>
                            </div>
                        </div>

                    )
                })
            }
            </CardContent>
            
        </Card>
    )
}
