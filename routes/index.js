var express = require('express')

var db = require('../db')

module.exports = {
  get: get,
	add: add,
	submit: submit,
	edit: edit,
	submitEdit: submitEdit,
	confirm: confirm,
	delete: deleteUser
}

function get (req, res) {
  db.getUsers()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

//displays a form to add new user
function add(req, res) {
		res.render('new')
	// .catch(function (err) {
	// 	res.status(500).send('FORM ERROR: ' + err.message)
	// })
}

function submit(req, res) {
	var object = {
		name: req.body.name,
		email: req.body.email,
		id: req.body.id
	}
	db.addUser(object)
		.then(function () {
			res.redirect('/users')
		})
		.catch(function (err) {
			res.status(500).send(err.message)
		})
}

function edit(req, res) {
	var id = Number(req.params.id)
	db.getUser(id)
		.then(function (user) {
			res.render('edit', user[0])

		})
		.catch(function (err) {
			res.status(500).send('DATABASE ERROR: ' + err.message)
		})

		// var user = db.getUser(Number(req.params.id))
		// res.render('edit', user)
}

function submitEdit(req, res) {
	var object = {
		name: req.body.name,
		email: req.body.email,
		id: req.body.id
	}
	db.editUser(object)
		.then(function () {
			res.redirect('/users')
		})
		.catch(function (err) {
			res.status(500).send(err.message)
		})
}

//displays confirmation form for deletion
function confirm(req, res) {
	var id = Number(req.params.id)
	db.getUser(id)
		.then(function (user) {
			res.render('confirm', user[0])

		})
		.catch(function (err) {
			res.status(500).send('DATABASE ERROR: ' + err.message)
		})
	}

//deletes user from database and redirects to homepage
function deleteUser(req, res) {
	var id = Number(req.params.id)
	db.deleteUser(id)
		.then(function (user) {
			res.redirect('/users')
		})
		.catch(function (err) {
			res.status(500).send('PROBLEM DELETING USER: ' + err.message)
		})
}
