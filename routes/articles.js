const router = require("express").Router();
const {
  getSavedArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

// //return all articles saved by the user
router.get("/", getSavedArticles);
//create article
router.post("/", createArticle);
//delete the stored article by _id
router.delete("/:id", deleteArticle);

module.exports = router;
