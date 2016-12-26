var environment = process.env.NODE_ENV || 'development'
var config = require('./knexfile')[environment]
var connection = require('knex')(config)

module.exports = {
  getUser: getUser,
  getUsers: getUsers,
	addUser: addUser,
	editUser: editUser,
	deleteUser: deleteUser
}

function getUsers (testDb) {
  // Use a test database if one is passed in, or the connection defined above.
  var db = testDb || connection
  return db('users').select()
}

function getUser (id, testDb) {
  var db = testDb || connection
  return db('users').where('id', id)
}

function addUser(data, testDb) {
	var db = testDb || connection
	return db('users').insert(data)
}

function editUser(user, testDb) {
	return getUser(user.id, testDb)
		.update(user)
}

function deleteUser(id, testDb) {
	return getUser(id, testDb)
		.del()
}
