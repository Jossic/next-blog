const User = require('../models/userModel');
const shortId = require('shortid');

exports.signup = (req, res) => {
	User.findOne({
		email: req.body.email,
	}).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error:
					'Cet email est déjà utilisé',
			});
		}

		const {
			name,
			email,
			password,
		} = req.body;
		let username = shortId.generate();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;

		let newUser = new User({
			name,
			email,
			password,
			profile,
			username,
		});
		newUser.save((err, success) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}
			// res.json({
			// 	user: success,
			// });
			res.json({
				message:
					'Enregistrement confirmé, connectez-vous',
			});
		});
	});
};
