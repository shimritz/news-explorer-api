const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const InternalError = require('../errors/internal-error');
const { internalLogger } = require('../utils/logger');
const {
  CREATED,
  SUCCESS,
  SERVER_ERROR_MESSAGE,
  INVALID_DATA_MESSAGE,
} = require('../utils/constants');

const getSavedArticles = (req, res, next) => {
  const ownerId = req.user._id;

  Article.find({ owner: ownerId })
    .orFail(() => new NotFoundError('No articles found'))
    .then((articles) => res.status(SUCCESS).send({ data: articles }))
    .catch((err) => {
      internalLogger.error('getSavedArticles:', err);
      next(new InternalError(SERVER_ERROR_MESSAGE));
    });
};

// create article
const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(CREATED).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_MESSAGE));
      } else {
        internalLogger.error('createArticle:', err);
        next(new InternalError(SERVER_ERROR_MESSAGE));
      }
    });
};

// delete article
const deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .orFail(() =>
      next(new NotFoundError('No article found for the specified id'))
    )
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        internalLogger.error(
          'deleteArticle:',
          'article does not belong to the user'
        );
        next(new ForbiddenError('You cannot delete someone elses article'));
      } else {
        Article.deleteOne(article).then(() => res.send({ data: article }));
      }
    })
    .catch((err) => {
      internalLogger.error('deleteArticle:', err);
      next(new InternalError(SERVER_ERROR_MESSAGE));
    });
};

module.exports = {
  getSavedArticles,
  createArticle,
  deleteArticle,
};
