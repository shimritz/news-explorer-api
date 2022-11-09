const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, EMPTY_STR_MESSAGE],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'email is invalid',
      },
    },
    password: {
      type: String,
      required: [true, EMPTY_STR_MESSAGE],
      select: false,
    },
    name: {
      type: String,
      required: [true, EMPTY_STR_MESSAGE],
      minlength: [2, MIN_STR_MESSAGE],
      maxlength: [30, MAX_STR_MESSAGE],
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email of password'));
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(new Error('Incorrect email of password'));
        }

        return user;
      });
    });
};

// removing password from returned object
userSchema.set('toJSON', {
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('user', userSchema);
