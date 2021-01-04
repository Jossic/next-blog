const Blog = require('../models/blogModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../helpers/blog');

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Impossible d'uploader l'image",
			});
		}

		const { title, body, categories, tags } = fields;

		if (!title || !title.length) {
			return res.status(400).json({
				error: 'Le titre est requis',
			});
		}

		if (!body || body.length < 200) {
			return res.status(400).json({
				error: 'Le contenu est trop court',
			});
		}

		if (!categories || categories.length === 0) {
			return res.status(400).json({
				error: 'Au moins une catégorie est requise',
			});
		}

		if (!tags || tags.length === 0) {
			return res.status(400).json({
				error: 'Au moins un tag est requis',
			});
		}

		let blog = new Blog();
		blog.title = title;
		blog.body = body;
		blog.excerpt = smartTrim(body, 320, ' ', '...');
		blog.slug = slugify(title).toLowerCase();
		blog.mtitle = `${title} | ${process.env.APP_NAME}`;
		blog.mdesc = stripHtml(body.substring(0, 160));
		blog.postedBy = req.user._id;

		let arrayOfCategories = categories && categories.split(',');
		let arrayOfTags = tags && tags.split(',');

		if (files.photo) {
			if (files.photo.size > 10000000) {
				return res.status(400).json({
					error: "L'image est trop lourde (>1Mb)",
				});
			}
			blog.photo.data = fs.readFileSync(files.photo.path);
			blog.photo.contentType = files.photo.type;
		}

		blog.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			// res.json(result);
			Blog.findByIdAndUpdate(
				result._id,
				{ $push: { categories: arrayOfCategories } },
				{ new: true }
			).exec((err, result) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				} else {
					Blog.findByIdAndUpdate(
						result._id,
						{ $push: { tags: arrayOfTags } },
						{ new: true }
					).exec((err, result) => {
						if (err) {
							return res.status(400).json({
								error: errorHandler(err),
							});
						} else {
							res.json(result);
						}
					});
				}
			});
		});
	});
};

exports.list = (req, res) => {
	Blog.find({})
		.populate('categories', '_id name slug')
		.populate('tags', '_id name slug')
		.populate('postedBy', '_id name username')
		.select(
			'_id title slug excerpt categories tags postedBy createdAt updatedAt'
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
};

exports.listAllBlogsCategoriesTags = (req, res) => {
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;

	let blogs;
	let categories;
	let tags;

	Blog.find({})
		.populate('categories', '_id name slug')
		.populate('tags', '_id name slug')
		.populate('postedBy', '_id name username profile')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.select(
			'_id title slug excerpt categories tags postedBy createdAt updatedAt'
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			blogs = data;

			Category.find({}).exec((err, cat) => {
				if (err) {
					return res.json({
						error: errorHandler(err),
					});
				}
				categories = cat;
				Tag.find({}).exec((err, tag) => {
					if (err) {
						return res.json({
							error: errorHandler(err),
						});
					}
					tags = tag;

					res.json({ blogs, categories, tags, size: blogs.length });
				});
			});
		});
};

exports.read = (req, res) => {};

exports.remove = (req, res) => {};

exports.update = (req, res) => {};
