const express = require('express');
const router = express.Router();
const { signup, login, user } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);
// execute 'user' only when 'verifyToken' returns next()
router.get('/user', verifyToken, user);

module.exports = router;
