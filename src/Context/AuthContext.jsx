import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }){
    const [userLogin, setUserLogin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if(token !== null){
            setUserLogin(token);
        }
    }, []);

    return(
        <AuthContext.Provider value={{userLogin, setUserLogin}}>
           {children}
        </AuthContext.Provider>
    )
}