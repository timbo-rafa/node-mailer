const mailer = require('./nodemailer-wrapper');
const router = require('express').Router()
const nconf = require('../nconf.js')

console.log('mailer-wrapper loaded')

router
  .route('/')
  .post(function sendMail(req, res, next) {

  let mailOptions = {}
  
  //parse input
  if (req.body.subject && req.body.subject !== '') {
    mailOptions.subject = req.body.subject
  } else {
    mailOptions.subject = nconf.get('SUBJECT')
  }
  mailOptions.replyTo = req.body.name + " <" + req.body.from + ">"
  mailOptions.text = req.body.text

  mailer.sendMail(mailOptions, function(error) {
    if (error) {
      return res.status(550).send(error)
    }
    return res.sendStatus(200)
  })
})

module.exports = router
