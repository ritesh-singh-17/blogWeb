import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blogweb-backend.onrender.com/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [cat])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  return (
    <>
      <div className="home container">
        {
          posts.length > 0 ?
            <div className="posts">
              {
                posts.map(post => {
                  return (<div className="post" key={post.id}>
                    <div className="img">
                      <img src={post.postimg} alt={post.title} />
                    </div>
                    <div className="content">
                      <NavLink className="link" to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <p>{getText(post.desc)}</p>
                        <button>Read More</button>
                      </NavLink>
                    </div>
                  </div>)
                })
              }
            </div>
            :
            <div className="posts">
              <h1>No post to show</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Home