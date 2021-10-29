import React, { useState , useEffect, useContext, useRef, forwardRef} from 'react'

// Cards
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import "./post.css";

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';


import axios  from 'axios';
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/authContext';

import { Modal, Typography  } from '@mui/material';
import CommentSection from './postComments';





export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userInfo, setuserInfo] = useState({});
  const {user} = useContext(AuthContext);
  
  const [likes, setLikes] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);
  const [heartClick, setHeartClick] = useState(false); 
  const [openModal , setOpenModal] = useState(false);

  const [openComments , setOpenComments] = useState(false);
 

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);
  
  useEffect(() => {
    const fetchUser = async() =>{
      const res = await axios.get(`/users?userId=${post.userId}`);
      setuserInfo(res.data);
    }
    fetchUser();
  }, [post.userId])


  const  handleLike = async()=>{
    if(post.userId === user._id)return;
    try{
      await axios.put(`/posts/${post._id}/like` , {userId : user._id} )
    }catch(err){}

    setLikes(isliked ? likes -1 : likes + 1);
    setIsLiked(!isliked);
  }

  function handleHeartClick(){
    setHeartClick(!heartClick);
  }

  const handleDeletePost = () =>{
    setOpenModal(true);
  }
  

  const handleYesModalClick = async() =>{
    // delete the post
    try{
      await axios.delete(`/posts/${post._id}` , {params : {userId : user._id}});
      setOpenModal(false);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

    
   const Style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3
  };

 

  return (

    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="card" >
        <CardContent >
          <div className="postTop">
            <div className="postTopleft">
              <Link to={`profile/${userInfo.username}`}>
                <img className="postProfileImg" src={userInfo.profilePicture || PF+"person/noavtaar.png"} alt="" />
              </Link>
            
              <span className="postUserName">{userInfo.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            {
              post.userId === user._id && 
              (<div className="postTopRight">
              <Button onClick={handleDeletePost}><DeleteIcon/></Button>
              </div>)
            }
            {
               openModal &&  (
                <Modal onClose={() => setOpenModal(false)} open={openModal}>
                  <Box sx={Style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Are you sure you want to delete this post ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <Button variant="contained" sx={{mr : 2}} onClick={handleYesModalClick}>
                        Yes
                      </Button>
                      <Button variant="contained" onClick={() => setOpenModal(false)}> No </Button>
                    </Typography>
                  </Box>
               </Modal>
               )
            }         
            
          </div>

          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img className="postImg" src={post.image} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">

              <IconButton onClick={handleHeartClick}> <FavoriteIcon className={heartClick ? "heartIcon" : "dislikeIcon"}  /> </IconButton>
              <IconButton onClick={handleLike}> <ThumbUpIcon className={isliked ? "thumbsUp" : "dislikeIcon"} /> </IconButton>

              <span className="postLikeCounter">{likes} likes </span>
            </div>

            <div className="postBottomRight">
              <span className="postCommentText" onClick={() => setOpenComments(!openComments)}>{post.comments.length === 1 ? " 1 comment" : `${post.comments.length} comments`}</span>
            </div>

          </div>
            <div className="comments">
              {openComments && <CommentSection post={post}/>}
            </div>
        </CardContent>

      </Card>
    </Box>


  )
}
