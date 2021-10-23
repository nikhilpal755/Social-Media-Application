import React from 'react'
import { useState, useContext, useRef, forwardRef} from 'react'
import { AuthContext } from '../../context/authContext';
import { Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios  from 'axios';
// import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function CommentSection({post}) {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const comment = useRef();
    const [commented , setCommented] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(true);
    const [allComments , setAllComments] = useState(null);
    const [showLoadComments, setShowLoadComments] = useState(true)
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };
    

    const postComment = async(e) =>{
        e.preventDefault();
        if(comment.current.value === '')return;
    
        const obj ={
           userId : user._id,
           reply :comment.current.value 
        }
    
        try{
          const res =  await axios.post(`/posts/${post._id}/comment`, obj);
          console.log(res.data);
          comment.current.value ="";
          setCommented(true);
          setOpenSnackbar(true);
    
    
        }catch(err){
          console.log(err);
        }

      }

    const handleGetComments = async(e) =>{
        e.preventDefault();
        setShowLoadComments(!showLoadComments);
        try{
            const res = await axios.get(`/posts/${post._id}/comments` );
            console.log(res.data);
            setAllComments(res.data);
        }
        catch(err){
            console.log(err);
        }
    }




    return (
        <>
                <div className="userComment" style={{display: 'flex'}}>
                  <Link to={`profile/${user.username}`}>
                      <img className="postProfileImg" src={user.profilePicture || PF+"person/noavtaar.png"} alt=""  style={{margin : '15px 4px 0 0'}}/>
                   </Link>
                  <TextField  id="filled-basic" label="Comment..." variant="filled" style={{width : '80%'}}
                  inputRef={comment}/>
                  <Button variant="outlined" color="secondary" onClick={postComment}>reply</Button>
                </div>

                  {commented && (
                       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} >
                          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Commented Successfully...
                          </Alert>
                        </Snackbar>
                  )}
                 { showLoadComments ? <Button onClick={handleGetComments} style={{margin : '2%'}}>Load comments</Button>  : (
                     <span>ho gya</span>
                 )
                }
            
        </>
    )
}
