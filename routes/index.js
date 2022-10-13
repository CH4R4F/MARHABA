const router = require("express").Router();
const authRoutes = require("./api/auth");

router.use("/api/auth/", authRoutes);

module.exports = router;
