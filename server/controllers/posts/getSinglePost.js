const db = require("../../db.js")

const getSinglePost = (req,res)=>{
    const q = "select p.id,`username`,`title`,`desc`,`cat`,`date`,`postimg`,`userimg` from users u join posts p on u.id=p.uid where p.id = ? "
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        else{
            return res.status(200).json(data[0]);
        }
    })    
}
module.exports = getSinglePost;