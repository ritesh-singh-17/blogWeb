import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from './authContext';

const Navbar3 = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="logo">
                        <NavLink to="/" className="link">
                            <h2>blogWEB</h2>
                        </NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 links">
                            <NavLink className='link' to="/?cat=art"><h6 className='m-0'>ART</h6></NavLink>
                            <NavLink className='link' to="/?cat=science"><h6 className='m-0'>SCIENCE</h6></NavLink>
                            <NavLink className='link' to="/?cat=technology"><h6 className='m-0'>TECHNOLOGY</h6></NavLink>
                            <NavLink className='link' to="/?cat=cinema"><h6 className='m-0'>CINEMA</h6></NavLink>
                            <NavLink className='link' to="/?cat=design"><h6 className='m-0'>DESIGN</h6></NavLink>
                            <NavLink className='link' to="/?cat=food"><h6 className='m-0'>FOOD</h6></NavLink>
                            <span>{currentUser?.username}</span>
                            {currentUser ? <span onClick={logout}>Logout</span> : <NavLink className="link" to="/login">Login</NavLink>}
                            <span className='write'><NavLink className="link" to="/write">Write</NavLink></span>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar3
