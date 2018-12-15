const router = require('express').Router()
const sha1 = require('node-sha1')

console.log('sha1 loaded')

router.route('/').get(function help(req, res, next) {
  return sha1("", function(err, hash) {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(200).send(hash)
    }
  })
})

router.route('/:sha1string').get(function hash(req, res, next) {
  let string = req.sha1string
  return sha1(string, function(err, hash) {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(200).send(hash)
    }
  })
})

router.param('sha1string', function (request, response, next, sha1string) {
  request.sha1string = sha1string
  return next()
})

module.exports = router
