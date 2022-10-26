const Users = require("../models/user");
const bcrypt = require("bcrypt");

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

module.exports = {
  createUser,
};
