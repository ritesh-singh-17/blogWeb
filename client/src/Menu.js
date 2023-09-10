import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Menu = ({ cat }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://blogweb-backend.onrender.com/api/posts/?cat=${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [cat])

    return (
        <>
            <div className="menu">
                <h1>Other posts you may like.</h1>
                <div className='menuPosts'>
                {
                    posts.map((post) => {
                        return (
                            <NavLink className="link" to={`/post/${post.id}`}>
                                <div className="post" key={post.id}>
                                    <img src={post.postimg} alt="" />
                                    <h5>{post.title}</h5>
                                    <a href=""></a>
                                    <button>Read More</button>
                                </div>
                            </NavLink>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}

export default Menu
