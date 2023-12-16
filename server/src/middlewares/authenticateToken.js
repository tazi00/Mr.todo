const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach user information to the request for later use
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid access token" });
  }
};

module.exports = authenticateToken;
