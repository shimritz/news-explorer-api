const { PORT = 3000 } = process.env;

const express = require('express');
const cors = require('cors');

const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middleware/rate-limit');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/error-handler');
const { DB_ADDRESS } = require('./utils/config');
const router = require('./routes/index');

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://news-explorer-sz.students.nomoredomainssbs.ru'
    : 'http://localhost:3000';

mongoose.connect(DB_ADDRESS);
const app = express();
app.use(helmet());
app.use(
  cors({
    origin,
    optionsSuccessStatus: 200,
  })
);

app.use(limiter);

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
