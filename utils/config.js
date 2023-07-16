require('dotenv').config();
// module.exports.JWT_SECRET = process.env.JWT_SECRET || "default_value_dfljhbdfk";
// module.exports.JWT_SECRET = "dnjuhncj12";
const { JWT_SECRET = 'mysecret' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/newsdb' } = process.env;
module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};
