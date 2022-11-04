const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // eslint-disable-next-line operator-linebreak
  const message =
    statusCode === 500 ? 'An error has occured on the server' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = { errorHandler };
