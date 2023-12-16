function errorHandler(err, req, res, next) {
  return res.status(500).json({ msg: "something going wrong pls try again" });
}
module.exports = errorHandler;
