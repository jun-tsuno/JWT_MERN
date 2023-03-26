const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const getUsers = require('../controllers/userController');

router.get('/', verifyToken, getUsers);

module.exports = router;
