// VALIDATION REGEX
// const isUrl =
//   /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
// STATUS CODE
const CREATED = 201;
const SUCCESS = 200;
const INVALID_DATA = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
// STATUS MESSAGES
const INVALID_DATA_MESSAGE = 'Invalid input';
const USER_NOT_FOUND_MESSAGE = 'No user with given id found';
const UNAUTHORIZED_MESSAGE = 'Authorization Required';
const SERVER_ERROR_MESSAGE = 'An error accured on the server';
const DATA_EXIST_MESSAGE = 'This user already exist';
// VALIDATION MESSAGES
const MIN_STR_MESSAGE = 'Input must be at least 2 characters long!';
const MAX_STR_MESSAGE = 'Input must be less then 30 characters long!';
const EMPTY_STR_MESSAGE = 'Required input!';
const VALID_EMAIL_MESSAGE = 'Valid Email is required!';
const VALID_URL_MESSAGE = 'Valid url link is required!';

module.exports = {
  CREATED,
  SUCCESS,
  INVALID_DATA,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  SERVER_ERROR,

  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DATA_EXIST_MESSAGE,
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE,
};
