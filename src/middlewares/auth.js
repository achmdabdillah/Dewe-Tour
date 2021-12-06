const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization")
  const token = authHeader && authHeader.split(' ')[1]
  // check if user send token via Authorization header or not
  if (!token) {
    // rejected request and send response access denied
    return res.status(401).send({ message: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //verified token
    req.user = verified;
    console.log(verified)
    next(); // if token valid go to the next request
  } catch (error) {
    // if token not valid send response invalid token
    res.status(400).send({ message: "Invalid token" });
  }
};