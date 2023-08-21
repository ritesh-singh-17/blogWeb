const express = require ("express");
const register = require("../controllers/auth/authRegister.js");
const login = require("../controllers/auth/authLogin.js");
const logout = require("../controllers/auth/authLogout.js");

const router = express.Router();

router.post("/register",register)
router.post("/login", login)
router.get("/logout",logout)

module.exports = router;