const db = require("../../db.js")
const jwt = require("jsonwebtoken");

const addPost = (req,res)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, "jwt-secret-key",(err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");

        const q = "insert into posts (`title`,`desc`,`postimg`,`cat`,`date`,`uid`) values (?) "
        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
        console.log(values);
        db.query(q, [values], (err, data) => {
            if (err) return res.status(403).json(err);
            else{
                console.log("succes")
                return res.json("Post has been created");
            }
        })
    })
}

module.exports = addPost;