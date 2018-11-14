const expect    = require('expect')
const supertest = require('supertest')
const app       = require('../index')
const nconf     = require('../nconf')

let mailer    = require('../mailer/mailer')

describe('Tests', function () {
  'use strict'

  let form = {
    to: nconf.get('TO'),
    from: nconf.get('FROM'),
    subject: nconf.get('SUBJECT'),
    text: 'text'
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
