const { default: mongoose } = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'The "email" field must be filled in'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "email is invalid",
      },
    },
    password: {
      type: String,
      required: [true, 'The "password" field must be filled in'],
      select: false,
    },

    name: {
      type: String,
      default: "Damien",
      required: [true, 'The "name" field must be filled in'],
      minlength: [2, 'The minimum length of the "name" field is 2'],
      maxlength: [30, 'The maximum length of the "name" field is 30'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
