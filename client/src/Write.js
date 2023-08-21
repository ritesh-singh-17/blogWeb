import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); // Upload the file to Firebase Storage
      return await fileRef.getDownloadURL(); // Get the URL of the uploaded file
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async e => {
    e.preventDefault();
    const imgurl =await upload();
    if(file===null){
      alert("You have not uploaded any image")
    }
    try {
      state ? await axios.put(`https://blogweb-backend.onrender.com/api/posts/${state.id}`, {
        title, desc: value, cat, img: file ? imgurl : ""
      }) : await axios.post(`https://blogweb-backend.onrender.com/api/posts/`, {
        title, desc: value, cat, img: file ? imgurl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
      navigate("/");
    } catch (err) {
      console.log("error rormr")
      console.log(err);
    }
  }

  return (
    <>
      <div className="add container">
        <div className="content">
          <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill theme='snow' className='editor' value={value} onChange={setValue} />
          </div>
        </div>
        <div className="menu">
          <div className="item gap-1">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input style={{ display: "none" }} type="file" id='file' name='' onChange={e => setFile(e.target.files[0])} />
            <label className='file' htmlFor="file">Upload Image</label>
            <div className="buttons">
              <button>Save as a draft</button>
              <button onClick={handleClick}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio" checked={cat === "art"} name="category" value="art" id="art" onChange={e => setCat(e.target.value)} />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "science"} name="category" value="science" id="science" onChange={e => setCat(e.target.value)} />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "technology"} name="category" value="technology" id="technology" onChange={e => setCat(e.target.value)} />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "cinema"} name="category" value="cinema" id="cinema" onChange={e => setCat(e.target.value)} />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "design"} name="category" value="design" id="design" onChange={e => setCat(e.target.value)} />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "food"} name="category" value="food" id="food" onChange={e => setCat(e.target.value)} />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Write
