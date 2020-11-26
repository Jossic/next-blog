const { check } = require('express-validator');

exports.userSignupValidator = [
	check('name')
		.not()
		.isEmpty()
		.withMessage('Le nom est requis'),
	check('email')
		.isEmail()
		.withMessage(
			"L'adresse email n'est pas au bon format"
		),
	check('password')
		.isLength({ min: 6 })
		.withMessage(
			'Le mot de passe doit comporter au minimum 6 caractères'
		),
];

exports.userSigninValidator = [
	check('email')
		.isEmail()
		.withMessage(
			"L'adresse email n'est pas au bon format"
		),
	check('password')
		.isLength({ min: 6 })
		.withMessage(
			'Le mot de passe doit comporter au minimum 6 caractères'
		),
];
