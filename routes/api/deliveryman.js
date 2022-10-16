const router = require("express").Router();
const { getDeliverymanInfo } = require("../../controllers/users/deliveryman");

router.get("/:dman", getDeliverymanInfo);

module.exports = router;
