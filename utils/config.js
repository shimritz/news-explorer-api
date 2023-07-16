require('dotenv').config();

const { JWT_SECRET = 'mysecret' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/newsdb' } = process.env;
module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};
