const User = require('../models/userModel');

exports.read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(res.profile);
};
