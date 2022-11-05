const { PORT = 3000 } = process.env;

const express = require('express');

const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/error-handler');
const { DB_ADDRESS } = require('./utils/config');
const router = require('./routes/index');

mongoose.connect(DB_ADDRESS);
const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.use(requestLogger);
app.use(errorLogger);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
