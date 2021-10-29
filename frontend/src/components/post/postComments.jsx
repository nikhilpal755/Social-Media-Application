import React from 'react'
import { useState, useContext, useRef, forwardRef } from 'react'
import { AuthContext } from '../../context/authContext';
import { IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';



const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CommentSection({ post }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const comment = useRef();
  const [commented, setCommented] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [showLoadComments, setShowLoadComments] = useState(true)





  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const postComment = async (e) => {
    // e.preventDefault();
    if (comment.current.value === '') return;
    
    const obj = {
      userId : user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      reply: comment.current.value,
      postedAt : Date.now()
    }
    
    try {
      const res = await axios.post(`/api/posts/${post._id}/comment`, obj);
      console.log(res.data);
      comment.current.value = "";
      setCommented(true);
      setOpenSnackbar(true);
      setAllComments([ res.data, ...allComments ])
      
      
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
    
  }


  const handleGetComments = async (e) => {
    e.preventDefault();
    setShowLoadComments(false);

    let comments = [];
    post.comments.map((comment) => {
      comments.push(comment);
    })
    comments.sort((c1, c2) =>{ return (new Date(c2.postedAt) - new Date(c1.postedAt))});
    setAllComments(comments);
  }






  return (
    <>
      <div className="userComment" style={{ display: 'flex' }}>
        <Link to={`profile/${user.username}`}>
          <img className="postProfileImg" src={user.profilePicture || PF + "person/noavtaar.png"} alt="" style={{ margin: '15px 4px 0 0' }} />
        </Link>
        <TextField id="filled-basic" label="Comment..." variant="filled" style={{ width: '80%' }}
          inputRef={comment} />
        <Button variant="outlined" color="secondary" onClick={postComment}>reply</Button>
      </div>

      {commented && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Commented Successfully...
          </Alert>
        </Snackbar>
      )}
      {showLoadComments ? <Button onClick={handleGetComments} style={{ margin: '2%' }}>Load comments</Button> : (
      
        allComments.map((comment) => {
          return (
            <div style={{ display: 'flex' , marginTop : '20px'}}>
              <Link to={`profile/${comment.username}`}>
                 <Avatar src={comment.profilePicture} alt="" />
              </Link>
              <h4 style={{margin : '10px'}}>{comment.username}</h4>
              <span style={{width : '70%', marginTop : '10px'}}>{comment.reply}</span> 
              <span style={{marginTop : '10px', fontSize : '12px'}}>{format(comment.postedAt)}</span>

            </div>
          )
        })    
        )
      }
      {
        !showLoadComments && <Button onClick={() => setShowLoadComments(true)}>Show less</Button>
      }

    </>
  )
}
