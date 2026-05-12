import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }){
    const [userLogin, setUserLogin] = useState(null);
const [userId,setuserId] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if(token !== null){
            setUserLogin(token);
        }
    }, []);

useEffect(()=>{
    if (localStorage.getItem("userToken")) {
        const { user } = jwtDecode(localStorage.getItem("userToken"));
        //console.log("decoded:", user);
        setuserId(user)
    }
},[userLogin])

    return(
        <AuthContext.Provider value={{userLogin, setUserLogin,userId}}>
           {children}
        </AuthContext.Provider>
    )
}