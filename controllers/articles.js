const Article = require("../models/article");
const { login } = require("./users");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

const getSavedArticles = (req, res, next) => {
  const ownerId = req.user._id;

  Article.find({ owner: ownerId })
    //TODO: get only saved articles and not all articles in db
    // if (!article.owner.equals(req.user._id))
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};
//create article

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
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data format is incorrect"));
      } else {
        next(err);
      }
    });
};
//delete article
const deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .orFail(() => new NotFoundError("No card found for the specified id"))
    .orFail(() => console.log("not found err"))
    .then((article) => {
      //   if (!article.owner.equals(req.user._id)) {
      //     next(new ForbiddenError("You cannot delete someone elses article"));
      //   } else {
      Article.deleteOne(article).then(() => res.send({ data: article }));
      //   }
    })

    .catch(next);
};

module.exports = {
  getSavedArticles,
  createArticle,
  deleteArticle,
};
