// method: POST
// url: /api/user/deliveryman/:dman
// access: Private - [Manager, deleveryman]
const getDeliverymanInfo = (req, res) => {
  res.status(200).send(req.params.dman);
};

module.exports = {
  getDeliverymanInfo,
};
