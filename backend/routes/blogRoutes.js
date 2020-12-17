const express = require('express');
const router = express.Router();
const { create } = require('../controllers/blogController');
const {
	requireSignin,
	authMiddleware,
} = require('../controllers/authController');

router.post('/blog', requireSignin, authMiddleware, create);

module.exports = router;
