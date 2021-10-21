import React from 'react'
import "./profileinfo.css";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AuthContext } from "../../context/authContext"
import { useContext, useState, useEffect } from 'react';
import axios from "axios";




export default function ProfileInfo({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: loginUser , dispatch} = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);

  // checking if loginUser is following user or not 
  useEffect(() => {
    setFollowed((Array.isArray(user.followers) && user.followers.includes(loginUser._id)))
    setFollowersCount((Array.isArray(user.followers)) ? user.followers.length : 0)
  }, [user.followers, loginUser._id])

  // geting friend list
  useEffect(() => {
    const getFriends = async () =>{
      try{
        const friendList = await axios.get(`/users/friends/${user._id}`);
        setFriends(friendList.data);
      }catch(err){
        console.log(err);
      }
    }
    getFriends();
  },[user]);

  const handleFollowClick = async() =>{
    try{
      if(followed){
        //unfollow
    
        await axios.put(`/users/${user._id}/unfollow` , {
          userId: loginUser._id
        });
        dispatch({type : "UNFOLLOW", payload : user._id})
        setFollowersCount(followersCount - 1);
      }else{
         await axios.put(`/users/${user._id}/follow` , {
           userId : loginUser._id
         })
         dispatch({type : "FOLLOW", payload : user._id});
         setFollowersCount(followersCount + 1);
      }
      setFollowed(!followed);

    }
    catch(err){

    }
  }




  return (
    <div className="profileInfo">

      {/* hm khud ko follow nhi kr skte  */}
      {loginUser.username !== user.username &&
        <Button variant="contained" sx={{marginLeft: 6}} onClick={handleFollowClick}>{followed ? "Following" : "follow"}   
        {followed ?  <RemoveIcon/> : <AddIcon/>}</Button>}

      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Followers:</span>
          <span className="rightbarInfoValue">{followersCount}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Following:</span>
          <span className="rightbarInfoValue">{(Array.isArray(user.following) && user.following.length) ? user.following.length : 0}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "married" : "single"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
      
        {
          friends.map((friend) =>{
            return (
              <div className="rightbarFollowing" key={friend._id}>
                <img src={friend.profilePicture || `${PF}person/noavtaar.png`} alt="friendImage" className="rightbarFollowingImg"/>
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            )
          })
        }


      </div>
    </div>
  );

}
