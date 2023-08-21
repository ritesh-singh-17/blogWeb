const db = require("../../db.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt=10;

const logout = (req,res) => {
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
}

module.exports = logout;