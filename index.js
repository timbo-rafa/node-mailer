const express = require('express')
const app = express()
const helmet = require('helmet')
const morganLogger = require('morgan')
const nconf = require('./nconf')
const bodyParser = require('body-parser')

app
  .use(helmet())
  .use(morganLogger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({'extended': true}))

app.use(function (request, response, next) {
  'use strict'

  let origin = request.headers.origin

  let allowedOrigins = ['http://127.0.0.1:8020',
                        'http://localhost:8020',
                        'http://127.0.0.1:9000',
                        'http://localhost:9000',
                        'https://rtimbo.com',
                        'https://timbo-rafa.github.io']

  if (allowedOrigins.indexOf(origin) > -1) {
    response.header('Access-Control-Allow-Origin',	origin)
  }

  //response.header('Content-Type', 'application/json')
  response.header('Content-Encoding', 'UTF-8')
  response.header('Content-Language', 'en')
  //response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  //response.header('Pragma', 'no-cache')
  //response.header('Expires', '0')
  //response.header('Access-Control-Allow-Methods', request.get('Access-Control-Request-Method'))
  //response.header('Access-Control-Allow-Headers', request.get('Access-Control-Request-Headers'))
  next()
})



const mailerRouter = require('./mailer/mailer')
app.use('/mailer', mailerRouter)

const sha1Router = require('./sha1/sha1')
app.use('/sha1', sha1Router)

// server ping (last route)
app.get('/', function pingSuccess (req, res, next) {
  'use strict'

  console.log('Server ping on /')
  //res.sendStatus(200)
  res.status(200).send({})
})

app.use(function handleErrors (error, request, response, next) {
  'use strict'

		console.error('handleErrors:',error)
		if(error) {
				console.error('error.message', error.message)
				return response.status(400).send({ error: error })
		}
  console.error(error.stack)
  response.status(500).end()
		return process.exit()
})

app.listen(nconf.get('PORT'), function () {
  console.log('Server listening at %s', nconf.get('PORT'))
})
module.exports = app
