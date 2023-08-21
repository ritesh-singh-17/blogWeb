const db = require("../../db.js")
const jwt = require("jsonwebtoken");

const updatePost = (req,res)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, "jwt-secret-key",(err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");

        const q = "update posts set `title`=?, `desc`=?, `postimg`=?, `cat`=? where `id`=? and `uid`=? "
        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]
        db.query(q, [...values, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json(err);
            else{
                return res.json("Post has been updated");
            } 
        })
    })
}
module.exports = updatePost;