const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');

const UnauthorizedError = require('../errors/unauthorized-error');
const InternalError = require('../errors/internal-error');
const NotFoundError = require('../errors/not-found-error');
const { internalLogger } = require('../utils/logger');
const {
  CREATED,
  SUCCESS,
  USER_NOT_FOUND_MESSAGE,
  DATA_EXIST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError(DATA_EXIST_MESSAGE));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      Users.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) => res.status(CREATED).send({ data: user.toJSON() }))
    .catch((err) => {
      internalLogger.error('createUser:', err);

      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(',')}`
          )
        );
      } else {
        next(new InternalError(SERVER_ERROR_MESSAGE));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET.toString(), {
        expiresIn: '7d',
      });

      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      internalLogger.error('login:', err);
      next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .orFail(() => new NotFoundError(USER_NOT_FOUND_MESSAGE))
    .then((user) => {
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      internalLogger.error('getUserById:', err);
      next(new InternalError(SERVER_ERROR_MESSAGE));
    });
};

const getCurrentUser = (req, res, next) => {
  const currentUser = req.user._id;
  Users.findById(currentUser)
    .orFail(() => new NotFoundError(USER_NOT_FOUND_MESSAGE))
    .then((user) => {
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      internalLogger.error('getCurrentUser:', err);
      next(new InternalError(SERVER_ERROR_MESSAGE));
    });
};

module.exports = {
  createUser,
  login,
  getUserById,
  getCurrentUser,
};
