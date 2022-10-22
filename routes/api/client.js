const router = require("express").Router();
const { getClientInfo } = require("../../controllers/users/client");
const { authorizeClient } = require("../../middlewares/auth");

router.get("/me", authorizeClient, getClientInfo);

module.exports = router;
