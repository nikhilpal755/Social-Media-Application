import { createContext , useReducer , useEffect } from "react";
import {AuthReducer} from "./authReducers";

const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    isFetching : false,
    error : false
}

// creating a context with intial state so that we could use it anywhere
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])

    const value = { 
        user : state.user,
        isFetching : state.isFetching,
        error : state.error,
        dispatch
    }
    return (
        // context provider
        <AuthContext.Provider  value ={value}>
            {children}
        </AuthContext.Provider>
    )
}