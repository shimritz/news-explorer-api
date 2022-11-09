const { SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || SERVER_ERROR;

  // eslint-disable-next-line operator-linebreak
  const message =
    statusCode === SERVER_ERROR
      ? 'An error has occured on the server'
      : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = { errorHandler };
