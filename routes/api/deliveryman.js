const router = require("express").Router();
const { getDeliverymanInfo } = require("../../controllers/users/deliveryman");
const { authorizeDeliveryman } = require("../../middlewares/auth");

router.get("/:dman", authorizeDeliveryman, getDeliverymanInfo);

module.exports = router;
