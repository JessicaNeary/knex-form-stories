var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')

var index = require('./routes/index')

var server = express()

module.exports = server

// Middleware

server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'views'))
server.use(bodyParser.urlencoded({ extended: true }))

// Routes

server.get('/users', index.get)
server.get('/users/new', index.add)
server.post('/users/submit', index.submit)
server.get('/edit/:id', index.edit)
server.post('/edit/submit/:id', index.submitEdit)
server.get('/users/confirm/:id', index.confirm)
server.post('/users/delete/:id', index.delete)
