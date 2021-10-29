import React,{useState, useRef, useEffect} from 'react'
import { Modal, Box, Typography} from '@mui/material'
import { MenuItem ,Select} from '@mui/material'
import { Button, TextField } from '@mui/material'
import axios from 'axios'

const Style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#dde1e7",
    boxShadow: 24,
    p: 4,
    borderRadius: 3
};



export default function EditProfile({openModal, setOpenModal, loginUser}) {
    
 
    const [status , setStatus] = useState('')
    const [coverPicture, setCoverPicture] = useState(null);
    const [profilePicture,setProfilePicture] = useState(null);
    const [coverUrl, setCoverUrl] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const description = useRef();
    const city = useRef();



 

    const upload_preset = "ufz0uowv";
    const cloud_name = "dcfg8797j";
  
    useEffect(() => {
        if (!coverPicture)return;

       
        const postOnCloudinary = async () => {
          const formData = new FormData();
          formData.append("file", coverPicture);
          formData.append("upload_preset", upload_preset);
          const options = {
            method: "POST",
            body: formData,
          };
          return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options)
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setCoverUrl(res.secure_url);
            
            })
            .catch((err) => console.log(err));  
          }
          postOnCloudinary();
     }, [coverPicture])

    
    useEffect(() => {
        if (!profilePicture) return;
    
    
        const postOnCloudinary = async () => {
          const formData = new FormData();
          formData.append("file", profilePicture);
          formData.append("upload_preset", upload_preset);
          const options = {
            method: "POST",
            body: formData,
          };
          return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options)
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setProfileUrl(res.secure_url);
            
            })
            .catch((err) => console.log(err));  
          }
          postOnCloudinary();
     }, [profilePicture])


    const handleSubmit = async(e) =>{
        e.preventDefault();

        // console.log(description.current.value, profilePicture.current.files[0], status)
    
        const profile = {
            userId : loginUser._id,
            coverPicture :  coverUrl ==="" ?  loginUser.coverPicture : coverUrl,
            profilePicture : profileUrl ==="" ?  loginUser.profilePicture : profileUrl,
            desc: description.current.value || loginUser.desc,
            city : city.current.value || loginUser.city,
            relationship : status || loginUser.relationship
        }
        try{
           const res =  await axios.patch(`/api/users/${loginUser._id}`, profile)
           console.log(res.data);
           localStorage.removeItem("user");
           localStorage.setItem("user", JSON.stringify(res.data))
           window.location.reload();
        }catch(err){
            console.log(err);
        }

    }

    const handleCoverPicture =(e) =>{
            if(!e.target.files[0])return;
            setCoverPicture(e.target.files[0]);
          
    }
    const handleProfilePicture =(e) =>{
            if(!e.target.files[0])return;
            setProfilePicture(e.target.files[0]);
          
    }
    return (
        <div>
           
                <Modal onClose={() => setOpenModal(false)} open={openModal}>
                    <Box sx={Style}>
                        <div style={{ display: 'flex' }}>

                            <Typography variant='h6' component="h5" style={{ paddingRight: '10px' }}> Cover : </Typography>
                            <input type="file" onChange={handleCoverPicture}/>
                         

                        </div>
                        <div style={{ display: 'flex' }}>

                            <Typography variant='h6' component="h5" style={{ paddingRight: '10px' }}> Profile: </Typography>
                            <input type="file" onChange={handleProfilePicture} />

                        </div>

                        <div className="city">
                            <Typography variant='h6' component="h5" style={{ paddingRight: '10px' }}> Description: </Typography>
                            <TextField type="text" fullWidth  inputRef={description}/>
                        </div>

                        <div style={{ display: "flex", marginTop: '10px' }}>
                            <Typography variant="h6" component="h5" style={{ paddingRight: '10px', marginTop: '12px' }}> City : </Typography>
                            <TextField type="text" inputRef={city}></TextField>
                        </div>

                        <div style={{ display: "flex", marginTop: '10px' }}>
                            <Typography variant="h6" component="h5" style={{ paddingRight: '10px', marginTop: '12px' }}> Relationship: </Typography>
                            
                            <Select  value={status}  onChange={(e)=> {
                                setStatus(e.target.value)}}   fullWidth>
                        
                                <MenuItem value={"Single"} >
                                    Single
                                </MenuItem>
                                <MenuItem value={"Married"}>
                                    Married
                                </MenuItem>
                                <MenuItem value={"None"}>
                                    None
                                </MenuItem>
                        
                            </Select>
                        </div>


                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to Edit your settings ?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={handleSubmit}>
                                Yes
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}> No </Button>
                        </Typography>
                    </Box>
                </Modal>
         
            
        </div>
    )
}
