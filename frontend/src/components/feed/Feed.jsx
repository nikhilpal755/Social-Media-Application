import React from 'react'
import "./feed.css"
import Share from '../share/share'
import Post from '../post/post'
import axios from "axios";

import {useState , useEffect , useContext} from "react"
import {AuthContext} from "../../context/authContext"

// import {Posts} from "../../data";
// we don't use dummy data , we will fetch data from api 

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async() =>{
           const res = username ? await axios.get(`/posts/profile/${username}` )
            : await axios.get(`posts/timeline/${user._id}`);

            // console.log(res.data);
           setPosts(res.data.sort((p1,p2) =>{
               return new Date(p2.createdAt) - new Date(p1.createdAt);
           }));
        }
        fetchPosts();
    }, [username , user._id])
    return (
        <div className="feed">
            <div className="feedWrapper">
                {!username && <Share/>}
                { (user.username === username) && <Share/> }
                {
                    posts.map(post => {
                
                       return <Post key={post._id} post={post}/>
                    })
                }

            </div>
        </div>
    )
}

export default Feed
