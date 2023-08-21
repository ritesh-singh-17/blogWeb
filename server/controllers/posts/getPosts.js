const db = require("../../db.js")

const getPosts = (req,res)=>{
    const q = req.query.cat 
     ? "select * from posts where cat = ?"
     : "select * from posts"
    
    db.query(q,[req.query.cat], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

module.exports = getPosts;