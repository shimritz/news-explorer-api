/* eslint-disable newline-per-chained-call */
const { Joi, celebrate } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const validator = require('validator');

// eslint-disable-next-line operator-linebreak
const UrlExp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

// validate the links - recommendation from project instructions
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isValidObjectId(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    keyword: Joi.string().required().messages({
      'string.required': 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      'string.empty': 'The "title" field must be filled in',
    }),
    text: Joi.string()
      .required()
      .messages({ 'string.empty': 'The "text" field must be filled in' }),
    date: Joi.string()
      .required()
      .messages({ 'string.empty': 'The "date" field must be filled in' }),
    source: Joi.string().required().messages({
      'string.empty': 'The "link" field must be filled in',
    }),
    link: Joi.string()
      .required()
      .pattern(RegExp(UrlExp))
      .message('The "link" field must be a valid URL')
      .messages({
        'string.empty': 'The "link" field must be filled in',
      }),
    image: Joi.string().required().custom(validateURL),
  }),
});

// validate user fields -name,about,avataer,email and password
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The "email" must be a valid email')
      .messages({
        // "string.email": 'The "email" must be a valid email',
        'string.empty': 'The "email" field must be filled in',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
    }),
  }),
});

// login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

module.exports = {
  validateArticle,
  validateObjId,
  validateURL,
  validateUser,
  validateAuthentication,
};
