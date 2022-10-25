const router = require("express").Router();

//return all articles saved by the user
router.get("/articles");

//create article
router.post("/articles");

//delete the stored article by _id
router.delete("/articles/articleId");
