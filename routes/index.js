const router = require("express").Router();
const authRoutes = require("./api/auth");
const clientRoutes = require("./api/client");
const managerRoutes = require("./api/manager");
const deliverymanRoutes = require('./api/deliveryman')

router.use("/api/auth/", authRoutes);
router.use("/api/user/client/", clientRoutes);
router.use("/api/user/manager/", managerRoutes);
router.use("/api/user/deliveryman/", deliverymanRoutes);


module.exports = router;
