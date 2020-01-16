const mailer = require('./nodemailer-wrapper');
const router = require('express').Router();
const nconf = require('../nconf.js');
const request = require('request');

console.log('mailer-wrapper loaded')

router
  .route('/')
  .post(function sendMail(req, res, next) {

  console.log('sendMail', req.body);
  let mailOptions = {}
  const recaptchaSecret = nconf.get('RECAPTCHA_SECRET');
  const recaptchaToken = req.body.token;
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
  
  request.post(
    recaptchaVerifyUrl,
    {},
    function (error, response, body) {
        if (body.success === false) {
            return res.status(500).send(error);
        }

        if (req.body.subject && req.body.subject !== '') {
          mailOptions.subject = req.body.subject
        } else {
          mailOptions.subject = nconf.get('SUBJECT')
        }
        mailOptions.replyTo = req.body.name + " <" + req.body.from + ">"
        mailOptions.text = req.body.text

        mailer.sendMail(mailOptions, function(error) {
          if (error) {
            return res.status(500).send(error)
          }
          return res.sendStatus(200)
        })        
    }
  );
})

module.exports = router
