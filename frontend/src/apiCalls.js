import axios from "axios";


export const LoginCall = async(userCredentials , dispatch) =>{
    dispatch({type : "LOGIN_START"});
    try{
        const res = await axios.post("/api/auth/login", userCredentials);
        // console.log(res);
        dispatch({type : "LOGIN_SUCCESS" , payload :  res.data});
    }
    catch(err){
        dispatch({type : "LOGIN_FAILURE" , payload : err});
    }
}

