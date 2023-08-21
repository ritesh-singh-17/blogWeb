const db = require("../../db.js")
const jwt = require("jsonwebtoken");

const deletePost2 = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, "jwt-secret-key",(err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");

        const q = "delete from posts where `id` = ? and `uid` = ?"
        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your posts")
            return res.json("Post has been deleted")
        })
    })
}

module.exports = deletePost2;