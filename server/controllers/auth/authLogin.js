const db = require("../../db.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = 10;

const login = (req, res) => {

    //check user
    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (data.length === 0) return res.status(404).json("User not found")

        //check password
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPassCorrect) return res.status(400).json("Wrong username or password")
        else {
            const id = data[0].id;
            const token = jwt.sign({ id }, "jwt-secret-key");
            const { password, ...other } = data[0];

            res.cookie("access_token", token, {
                expires: new Date(Date.now() + 2589000000),
                httpOnly: true,
            }).status(200).json(other)
        }
    })
}

module.exports = login;