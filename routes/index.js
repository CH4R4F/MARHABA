const router = require("express").Router();
const authRoutes = require("./api/auth");
const clientRoutes = require("./api/client");
const managerRoutes = require("./api/manager");
const deliverymanRoutes = require("./api/deliveryman");
const { protect } = require("../middlewares/auth");

router.use("/api/auth/", authRoutes);
router.use("/api/user/client/", protect, clientRoutes);
router.use("/api/user/manager/", protect, managerRoutes);
router.use("/api/user/deliveryman/", protect, deliverymanRoutes);

module.exports = router;
