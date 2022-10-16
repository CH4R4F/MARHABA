const router = require("express").Router();
const { getClientInfo } = require("../../controllers/users/client");

router.get("/:client", getClientInfo);

module.exports = router;
