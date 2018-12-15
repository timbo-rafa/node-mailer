const supertest = require('supertest')
const app       = require('../index')
const nconf     = require('../nconf')
const should    = require('should')

describe('sha1', function() {
  'use strict'

  it('should hash the empty string ""', function(done) {
    let request = supertest(app)
    request = request.get('/sha1/')
    request.send()
    request.expect(200)
    request.expect(function (res) {
      res.text.should.equal("da39a3ee5e6b4b0d3255bfef95601890afd80709")
    })
    request.end(done)
  })

  it('should hash "a"', function(done) {
    let request = supertest(app)
    request = request.get('/sha1/a')
    request.send()
    request.expect(200)
    request.expect(function (res) {
      res.text.should.equal("86f7e437faa5a7fce15d1ddcb9eaeaea377667b8")
    })
    request.end(done)
  })

  it('should hash "timbo"', function(done) {
    let request = supertest(app)
    request = request.get('/sha1/timbo')
    request.send()
    request.expect(200)
    request.expect(function (res) {
      res.text.should.equal("81dcb4673d8385c7ddf9b2194f41c3513d879322")
    })
    request.end(done)
  })
})
