const Article = require("../models/article");

const getSavedArticles = (req, res, next) =>
  Article.find({})
    .then((articleSchema) => res.status(200).send({ data: articles }))
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

module.exports = {
  getSavedArticles,
  createArticle,
};
