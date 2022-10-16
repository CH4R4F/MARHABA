// method: POST
// url: /api/user/manager/:manager
// access: Private - [Manager]
const getManagerInfo = (req, res) => {
  res.status(200).send(req.params.manager);
};

module.exports = {
  getManagerInfo,
};
