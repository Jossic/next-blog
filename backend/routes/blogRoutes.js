const express = require('express');
const router = express.Router();
const {
	create,
	list,
	listAllBlogsCategoriesTags,
	read,
	remove,
	update,
} = require('../controllers/blogController');
const {
	requireSignin,
	authMiddleware,
} = require('../controllers/authController');

router.post('/blog', requireSignin, authMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, authMiddleware, remove);
router.put('/blog/:slug', requireSignin, authMiddleware, update);

module.exports = router;
