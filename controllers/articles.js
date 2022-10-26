const Article = require("../models/article");

const getSavedArticles = (req, res, next) =>
  Article.find({})
    //TODO: get only saved articles and not all articles in db
    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      console.log(err);
    });
//create article

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  //   const owner = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      //   if (err.name === "ValidationError") {
      //     next(new BadRequestError("Data format is incorrect"));
      console.log(err);
      //   } else {
      //     next(err);
      //   }
    });
};
//delete article
const deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    // .orFail(() => new NotFoundError("No card found for the specified id"))
    .orFail(() => console.log("not found err"))
    .then((article) => {
      //   if (!article.owner.equals(req.user._id)) {
      //     next(new ForbiddenError("You cannot delete someone elses article"));
      //   } else {
      Article.deleteOne(article).then(() => res.send({ data: article }));
      //   }
    })

    .catch((err) => console.log(err));
};

module.exports = {
  getSavedArticles,
  createArticle,
  deleteArticle,
};
