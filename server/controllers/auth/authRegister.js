const db = require("../../db.js")
const bcrypt = require('bcryptjs');

const salt=10;

const register = (req,res) => {

    // check existing user
    const sql= "select * from users where email = ? or username = ? "
    db.query(sql, [req.body.email, req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length>0){
            return res.status(409).json("User already existed");
        } 

        //hash the password and create a user
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "insert into users (`username`,`email`,`password`) values (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created")
        })
    })
}

module.exports = register;