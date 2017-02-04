var bcrypt = require('bcrypt')
var Promise = require('promise')

module.exports = (plainPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hash, (err, res) => {
            if (err) reject(err)
            else resolve(res)
        })
    })
}