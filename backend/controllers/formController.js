const { sendEmailWithNodemailer } = require('../helpers/email');

exports.contactForm = (req, res) => {
	console.log(req.body);
	const { name, email, message } = req.body;

	const emailData = {
		from: process.env.NODE_MAILER_USER, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
		to: process.env.NODE_MAILER_USER, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
		subject: `${process.env.APP_NAME} | Formulaire de contact`,
		text: `Blog Next-JS \n Venant de: ${name} \n email: ${email} \n Son message: ${message}`,
		html: `
        <h4>Email reçu du formulaire de contact:</h4>
        <p>Nom: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <hr />
    `,
	};

	sendEmailWithNodemailer(req, res, emailData);
};
