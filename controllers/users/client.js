// method: POST
// url: /api/user/client/:client
// access: Private - [Manager, Client]
const getClientInfo = (req, res) => {
  res.status(200).send(req.params.client);
};

module.exports = {
  getClientInfo,
};
