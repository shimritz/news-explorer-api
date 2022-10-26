const express = require("express");

const router = require("express").Router();
const mongoose = require("mongoose");
// const { DB_ADDRESS } = require("./utils/config");

// mongoose.connect(DB_ADDRESS);
mongoose.connect("mongodb://localhost:27017/newsdb");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const { createUser, login } = require("./controllers/users");

app.post("/signup", createUser);
app.post("/signin", login);
app.use("/", router);
router.use("/articles", articleRouter);

router.use("/users", userRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
