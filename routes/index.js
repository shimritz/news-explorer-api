const router = require('express').Router();

const {
  validateUser,
  validateAuthentication,
} = require('../middleware/validation');
const auth = require('../middleware/auth');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');

const articleRouter = require('./articles');
const userRouter = require('./users');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/articles', articleRouter);
router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No exesting route'));
});

module.exports = router;
