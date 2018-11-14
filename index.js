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

const mailerRouter = require('./mailer/mailer')
app.use('/mailer', mailerRouter)

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