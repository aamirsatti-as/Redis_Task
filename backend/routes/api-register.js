const router = require('express-promise-router')();
const { login, signup } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
