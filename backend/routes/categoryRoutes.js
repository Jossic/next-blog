const express = require('express');
const router = express.Router();
const { create } = require('../controllers/categoryController');

const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const {
	adminMiddleware,
	requireSignin,
} = require('../controllers/authController');

router.post(
	'/category',
	categoryCreateValidator,
	runValidation,
	requireSignin,
	adminMiddleware,
	create
);

module.exports = router;
