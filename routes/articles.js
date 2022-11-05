const router = require('express').Router();
const { validateArticle, validateObjId } = require('../middleware/validation');
const {
  getSavedArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

// //return all articles saved by the user
router.get('/', getSavedArticles);
// create article
router.post('/', validateArticle, createArticle);
// delete the stored article by _id
router.delete('/:id', validateObjId, deleteArticle);

module.exports = router;
