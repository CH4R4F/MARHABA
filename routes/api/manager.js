const router = require("express").Router();
const { getManagerInfo } = require("../../controllers/users/manager");
const { authorizeManager } = require("../../middlewares/auth");

router.get("/:manager", authorizeManager, getManagerInfo);

module.exports = router;
