const express = require("express");

const router = require("express").Router();
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const { errorHandler } = require("./middleware/error-handler");
const {
  validateAuthentication,
  validateUser,
} = require("./middleware/validation");
const { DB_ADDRESS } = require("./utils/config");

mongoose.connect(DB_ADDRESS);
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const { createUser, login } = require("./controllers/users");

app.post("/signup", validateUser, createUser);
app.post("/signin", validateAuthentication, login);

router.use(auth);
router.use("/articles", articleRouter);
router.use("/users", userRouter);

app.use("/", router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
