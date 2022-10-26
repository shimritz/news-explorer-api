const router = require("express").Router();

const { getCurrentUser } = require("../controllers/users");

//return info about the logged-in user (email and name)
// router.get("/me", getCurrentUser);

module.exports = router;
