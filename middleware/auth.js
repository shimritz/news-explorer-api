const jwt = require('jsonwebtoken');
const { internalLogger } = require('../utils/logger');

// const UnauthorizedError = require("../errors/unauthorized-error");

const { JWT_SECRET } = require('../utils/config');
const { FORBIDDEN, NOT_FOUND } = require('../utils/constants');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(FORBIDDEN).send({ message: 'no authorization header provided' });
    return;
  }
  const token = authorization.substring(7, authorization.length);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET.toString());
  } catch (err) {
    internalLogger.error('auth:', err);
    res.status(NOT_FOUND);
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
