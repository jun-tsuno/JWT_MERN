const express = require('express');
const router = express.Router();
const {
	signup,
	login,
	user,
	refreshToken,
} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);
// execute 'user' only when 'verifyToken' returns next()
router.get('/user', verifyToken, user);
router.post('/refresh_token', refreshToken);

module.exports = router;
