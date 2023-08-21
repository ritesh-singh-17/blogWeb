import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:""
  })
  const[error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const res= await axios.post("https://blogweb-backend.onrender.com/api/auth/register",inputs,{
        headers:{
            "Content-Type":"application/json"
        },
withCredidential:true,
    },{
      headers:{
          "Content-Type":"application/json"
      },
withCredidential:true,
  })
      console.log(res)
      navigate("/login");
    }catch(err){
      setError(err.response.data);
      // console.log(err)
    }
  }

  return (
    <>
      <div className="auth">
        <h2 className='authtitle'>REGISTER</h2>
        <form >
          <input required type="text" name='username' onChange={handleChange} placeholder='username' />
          <input required type="email" name='email' onChange={handleChange} placeholder='email' />
          <input required type="password" name='password' onChange={handleChange} placeholder='password' />
          <button onClick={handleSubmit}>Register</button>
          {error && <p className='m-0'>{error}</p>}
          <span>Do you have account? <NavLink to="/login">Login</NavLink> </span>
        </form>
      </div>
    </>
  )
}

export default Register
