const nodemailer = require('nodemailer');
const router = require('express').Router()
const nconf = require('../nconf.js')

console.log('mailer')

router
  .route('/')
  .post(function sendMail(req, res, next) {

		nodemailer.createTestAccount((err, account) => {
				if (err) {
      console.log(err)
      return res.status(550).send(err)
				}

				//create reusable transporter object using the default smtp transport
				let transporter = nodemailer.createTransport({
      service: 'gmail',
      host:'smtp.gmail.com',
						//host: 'smtp.ethereal.email',
						//port: 587,
						//secure: true,
						auth: {
								user: nconf.get('GMAIL_USERNAME'),//nconf.get('ETHEREAL_USERNAME'),
								pass: nconf.get('GOOGLE_APP_PASSWORD')//nconf.get('ETHEREAL_PASS')
						}
				});

				let mailOptions = {
						from: nconf.get('FROM'),
						to: nconf.get('TO'),
						subject: nconf.get('SUBJECT'),
						//html: ''
						text: 'That was easy!'
				};
    console.log(mailOptions);

				//send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info) {
						if (error) {
								console.log(error);
        return res.status(551).send(error)
						} 

						console.log('Message %s sent: %s', info.messageId, info.response);
						// Preview only available when sending through an Ethereal account
						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
      return res.status(200).send(info) 
				});
})

/*
var transporter = nodemailer.createTransport({
    service: 'gmail'
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
});
*/

});

module.exports = router
