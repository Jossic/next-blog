const express = require('express');
const router = express.Router();
const {
	requireSignin,
	authMiddleware,
} = require('../controllers/authController');

const { read, publicProfile } = require('../controllers/userController');

router.get('/profile', requireSignin, authMiddleware, read);
router.get('/user/:username', publicProfile);

module.exports = router;
