/* eslint-disable newline-per-chained-call */
const { Joi, celebrate } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const validator = require('validator');
const {
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE,
} = require('../utils/constants');

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
      'string.required': EMPTY_STR_MESSAGE,
    }),
    title: Joi.string().required().messages({
      'string.empty': EMPTY_STR_MESSAGE,
    }),
    text: Joi.string()
      .required()
      .messages({ 'string.empty': EMPTY_STR_MESSAGE }),
    date: Joi.string()
      .required()
      .messages({ 'string.empty': EMPTY_STR_MESSAGE }),
    source: Joi.string().required().messages({
      'string.empty': EMPTY_STR_MESSAGE,
    }),
    link: Joi.string()
      .required()
      .custom(validateURL)

      .messages({
        'string.empty': 'The "link" field must be filled in',
        'string.uri': VALID_URL_MESSAGE,
      }),
    image: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "link" field must be filled in',
      'string.uri': VALID_URL_MESSAGE,
    }),
  }),
});

// validate user fields -name,about,avataer,email and password
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': EMPTY_STR_MESSAGE,
      'string.email': VALID_EMAIL_MESSAGE,
    }),
    password: Joi.string().required().messages({
      'string.empty': EMPTY_STR_MESSAGE,
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': MIN_STR_MESSAGE,
      'string.max': MAX_STR_MESSAGE,
    }),
  }),
});

// login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': EMPTY_STR_MESSAGE,
      'string.email': VALID_EMAIL_MESSAGE,
    }),
    password: Joi.string().required().messages({
      'string.empty': EMPTY_STR_MESSAGE,
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
