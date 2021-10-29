import React, { useEffect, useRef, useState } from "react";

// card 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

//icons
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { TextField, IconButton } from "@mui/material";


import { AuthContext } from "../../context/authContext";
import { useContext } from 'react';

import axios from "axios";

import "./share.css";




export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const desc = useRef();

  const upload_preset = "ufz0uowv";
  const cloud_name = "dcfg8797j";

  useEffect(() => {
    if (!file) return;


    const postOnCloudinary = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      const options = {
        method: "POST",
        body: formData,
      };
      return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setImageUrl(res.secure_url);
        })
        .catch((err) => console.log(err));  
      }
      postOnCloudinary();
 }, [file])


const handleFileUpload = async (e) => {
  if(!e.target.files[0])return;

  setFile(e.target.files[0]);


}

const handleSubmit = async (e) => {

  // console.log(file);

  e.preventDefault();
  if(!imageUrl)return;

  const newPost = {
    userId: user._id,
    image: imageUrl,
    desc: desc.current.value
  }

  console.log(desc, desc.current.value);
  try {
    await axios.post("/api/posts", newPost);

    console.log("bn gyi");
    window.location.reload();
  } catch (err) {
    console.log(err);
  }

};



return (

  <Box sx={{ minWidth: 275, marginTop:13}} >
    <Card variant="outlined" className="card">
      <CardContent >


        <img className="shareProfileImg" src={user.profilePicture || PF + "person/noavtaar.png"} alt="" />
        {imageUrl && 
          <img src={imageUrl} alt=""  width="200" height="200"/>
    
        }
        <TextField id="standard-basic" label={`What's in your mind ${user.username} ?`} variant="standard" className="inputField" inputRef={desc} />

        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginTop: 10 }}>
          <label htmlFor="file" >
            <IconButton >
              <PermMediaIcon htmlColor="tomato" />
            </IconButton>
              <span className="shareOptionText" style={{cursor:"pointer"}}>Photo or Video</span>
            <input type="file" id="file" style={{ display: "none" }} onChange={handleFileUpload} accept=".jpeg,.png,.jpg"/>
          </label>
          <div>
            <IconButton>
              <LabelIcon htmlColor="blue" />
            </IconButton>
            <span className="shareOptionText">Tag</span>
          </div>
          <div >
            <IconButton>
              <RoomIcon htmlColor="green" />
            </IconButton>
            <span className="shareOptionText">Location</span>
          </div>
          <div >
            <IconButton >
              <EmojiEmotionsIcon htmlColor="goldenrod" />
            </IconButton>
            <span className="shareOptionText">Feelings</span>
          </div>

          <Button variant="contained" type="submit" color="primary">Share</Button>
        </form>


      </CardContent>
    </Card>
  </Box>

);
}
