const nodemailer = require('nodemailer')
const nconf = require('../nconf')

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

let defaultMailOptions = {
  //from: nconf.get('FROM'),
  to: nconf.get('TO'),
  //subject: nconf.get('SUBJECT'),
  //html: ''
  text: 'That was easy!'
};

wrapper = {}

wrapper.sendMail = function(mailOptions, cb) {
  mailOptions.to = defaultMailOptions.to
  mailOptions.replyTo = mailOptions.from
  console.log('transporter.auth', transporter.transporter.auth);

  //send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error:', error);
      console.log('mailOptions:', mailOptions);
      return cb(error)
    } 

    console.log('Message ID: %s', info.messageId);
    console.log('Message response: %s', info.response);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    //error = null
    return cb(error)
  })
}

module.exports = wrapper
