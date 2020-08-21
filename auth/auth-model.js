const db = require("../database/dbConfig")

module.exports = {
    get,
    getBy,
    getById,
    insert,
    remove
}

function get() {
    return db('users')
}

function getById(id) {
    return db('users')
    .where({id})
    .first()
}
function getBy(filter) {
    return db("users")
    .where(filter)
    .orderBy("users.id")
}

function insert(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        return getById(ids[0])
    })
}

function remove(id) {
    return db('users')
    .where('id', id)
    .del()
}