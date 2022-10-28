const jwt = require("jsonwebtoken");
// const UnauthorizedError = require("../errors/unauthorized-error");

const { JWT_SECRET } = require("../utils/config");

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(403).send({ message: "no authorization header provided" });
    return;
  }
  const token = authorization.substring(7, authorization.length);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET.toString());
  } catch (err) {
    // next(new UnauthorizedError("Authorization Required"));
    console.log("token failed", err);
    res.status(404);
  }
  req.user = payload;

  next();
};

module.exports = auth;
