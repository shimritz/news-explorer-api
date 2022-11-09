const router = require('express').Router();
const { validateObjId } = require('../middleware/validation');
const { getCurrentUser, getUserById } = require('../controllers/users');

// return info about the logged-in user (email and name)

router.get('/me', getCurrentUser);
router.get('/:id', validateObjId, getUserById);

module.exports = router;
