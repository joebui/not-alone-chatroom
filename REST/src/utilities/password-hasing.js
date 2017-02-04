const bcrypt = require('bcrypt')
const config = require('config')
const Promise = require('promise')

module.exports = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(config.get('auth.salt-round'), (err, salt) => {
            bcrypt.hash(plainPassword, salt, (err, hash) => {
                if (err) reject(err)
                else resolve(hash)
            })
        })
    })
}