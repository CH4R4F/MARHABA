const router = require("express").Router();
const { getManagerInfo } = require("../../controllers/users/manager");

router.get("/:manager", getManagerInfo);

module.exports = router;
