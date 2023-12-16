const notfound = (req, res) =>
  res.status(404).json({ msg: "Route doesnt exist" });

module.exports = notfound;
