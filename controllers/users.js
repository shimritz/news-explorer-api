const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        res.send("bad request");
        console.log("The user with the provided email already exists");
        // throw new ConflictError(
        // "The user with the provided email already exists"
        // );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      Users.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      // if (err.name === "ValidationError") {
      //   next(
      //     new BadRequestError(
      //       `${Object.values(err.errors)
      //         .map((error) => error.message)
      //         .join(",")}`
      //     )
      //   );
      console.log(err);
      // } else {
      //   next(err);
      // }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      console.log("in login");
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      // next(new UnauthorizedError("Incorrect email or password"));
      console.log(err);
    });
};

module.exports = {
  createUser,
  login,
};
