const expect    = require('expect')
const supertest = require('supertest')
const app       = require('../index')
const nconf     = require('../nconf')

let mailer    = require('../mailer/mailer')

describe('Tests', function () {
  'use strict'

  let form = {
    to: 'to-garbage',
    from: 'rafael.soft.dev+from@gmail.com',
    subject: 'This is a test subject',
    text: 'This is a test email'
  }

  it('should send mail', function(done) {
    this.timeout(10000)
    let request = supertest(app)
    request = request.post('/mailer')
    request.send(form)
    request.expect(200)
    request.end(done)
  })
})
