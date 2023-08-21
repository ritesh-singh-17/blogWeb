import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Navbar from './Navbar'
import Footer from './Footer'
import Single from './Single'
import Write from './Write'

const App = () => {
    return (
        <>
            <div className="app">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<><Navbar /> <Home /> <Footer /></>}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/post/:id' element={<><Navbar /> <Single /> <Footer /></>}></Route>
                        <Route path='/write' element={<><Navbar /> <Write /> <Footer /></>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
