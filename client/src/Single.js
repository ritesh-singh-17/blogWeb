import React, { useContext, useEffect, useState } from 'react'
import edit from "./images/edit.png"
import delet from "./images/delete.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Menu from './Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from './authContext'

const Single = () => {
  const [post, setPost] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blogweb-backend.onrender.com/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log("error erroe")
        console.log(err);
      }
    }
    fetchData();
  }, [postId])


  const handleDelete = async () => {
    try {
      await axios.delete(`https://blogweb-backend.onrender.com/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log("error erroe")
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }
  
  return (
    <>
      <div className="single">
        <div className="content">
        <img src={post?.postimg} alt="singlePostImage" />
          <div className="user">
            {post?.userimg && <img src={post?.userimg} alt="" />}
            <div className="info">
              <span>{post?.username}</span>
              <p className='m-0'>Posted {moment(post?.date).fromNow()}</p>
            </div>
            {(currentUser?.username)===(post?.username) && <div className="edit">
              <NavLink to={`/write?edit=2`} state={post}>
                <img src={edit} alt="" />
              </NavLink>
              <img onClick={handleDelete} src={delet} alt="" />
            </div>}
          </div>
          <h1>{post?.title}</h1>
          {getText(post?.desc)}
        </div>
        <Menu cat={post?.cat}/>
      </div>
    </>
  )
}

export default Single
