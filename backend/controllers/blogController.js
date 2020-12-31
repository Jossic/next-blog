const Blog = require('../models/blogModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

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
