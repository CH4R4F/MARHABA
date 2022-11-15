const router = require("express").Router();
const { login, register, forgetPassword, resetPassword, verifyEmail, logout } = require("../../controllers/auth");

// api/auth/login
router.post("/login", login);

// api/auth/register
router.post("/register", register);

// api/auth/forgetPassword
router.post("/forgetpassword", forgetPassword);

// api/auth/resetpassword/:token
router.post("/resetpassword/:token", resetPassword);

// api/auth/confirm/:token
router.get("/confirm/:token", verifyEmail);

// api/auth/logout
router.get("/logout", logout);

module.exports = router;
