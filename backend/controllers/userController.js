const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(res.profile);
};

exports.publicProfile = (req, res) => {
	let username = req.params.username;
	let user;
	let blogs;

	User.findOne({ username }).exec((err, userFromDB) => {
		if (err || !userFromDB) {
			return res.status(400).json({
				error: 'Utilisateur non trouvé',
			});
		}
		user = userFromDB;
		let userId = user._id;
		Blog.find({ postedBy: userId })
			.populate('categories', '_id name slug')
			.populate('tags', '_id name slug')
			.populate('postedBy', '_id name')
			.limit(10)
			.select(
				'_id title slug excerpt categories tags postedBy createdAt updatedAt'
			)
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				user.photo = undefined;
				user.hashed_password = undefined;
				res.json({
					user,
					blogs: data,
				});
			});
	});
};

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "La photo n'a pas pu être téléchargée",
			});
		}
		let user = req.profile;
		user = _.extend(user, fields);

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: "L'image ne doit pas être supérieure à 1Mb",
				});
			}
			user.photo.data = fs.readFileSync(files.photo.path);
			user.photo.contentTpye = files.photo.type;

			user.save((err, result) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				user.hashed_password = undefined;
				res.json(user);
			});
		}
	});
};

exports.photo = (req, res) => {
	const username = req.params.username;
	User.findOne({ username }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'Utilisateur non trouvé',
			});
		}
		if (user.photo.data) {
			res.set('Content-type', user.photo.contentType);
			return res.send(user.photo.data);
		}
	});
};
