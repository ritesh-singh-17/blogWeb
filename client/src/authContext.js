import axios from "axios";
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    axios.defaults.withCredentials = true;

    const login = async (inputs) => {
        try{
            const res = await axios.post("/api/auth/login", inputs)
            setCurrentUser(res.data)
        }catch(e){
            console.log("error in login...not able to fetch data from server")
        }
    }
    const logout = async () => {
        axios.get("/api/auth/logout")
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