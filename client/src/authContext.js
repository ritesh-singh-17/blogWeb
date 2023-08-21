import axios from "axios";
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    axios.defaults.withCredentials = true;

    const login = async (inputs) => {
        console.log("hello")
        const res = await axios.post("https://blogweb-backend.onrender.com/api/auth/login", inputs,{
            headers:{
                "Content-Type":"application/json"
            },
    withCredidential:true,
        })
        console.log("hello2")
        setCurrentUser(res.data)
    }
    const logout = async () => {
        axios.get("https://blogweb-backend.onrender.com/api/auth/logout")
        .then(res => {
            window.location.reload(true);
          }).catch(err => console.log(err));
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext, AuthProvider };