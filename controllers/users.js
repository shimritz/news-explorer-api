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

const createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        return next(
          new ConflictError('The user with the provided email already exists')
        );
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
    .then((user) => res.status(201).send({ data: user.toJSON() }))
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
        next(new InternalError('Somethig went wrong'));
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
      next(new UnauthorizedError('Autorization error accured'));
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .orFail(() => new NotFoundError('No user with given id found'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      internalLogger.error('getUserById:', err);
      next(new InternalError('Something went wrong'));
    });
};

const getCurrentUser = (req, res, next) => {
  const currentUser = req.user._id;
  Users.findById(currentUser)
    .orFail(() => new NotFoundError('No user with given id found'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      internalLogger.error('getCurrentUser:', err);
      next(new InternalError('Something went wrong'));
    });
};

module.exports = {
  createUser,
  login,
  getUserById,
  getCurrentUser,
};
