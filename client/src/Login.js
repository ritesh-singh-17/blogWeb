import axios from 'axios';
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {login} =useContext(AuthContext);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  axios.defaults.withCredentials =true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      // console.log("helllo")
    }
  }
  return (
    <>
      <div className="auth">
        <h2 className='authtitle'>LOGIN</h2>
        <form >
          <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
          <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
          <button onClick={handleSubmit}>Login</button>
         {error && <p className='m-0'>{error}</p>}
          <span>Don't have account? <NavLink to="/register">Register</NavLink> </span>
        </form>
      </div>
    </>
  )
}

export default Login
