const Promise = require('promise')

const authRepo = require('../../DAL/repositories/auth-repository')
const constants = require('../utilities/constants')
const userLoginModel = require('../models/user/user-login')
const tokenGenerator = require('../utilities/token-generator')
const passwordHashing = require('../utilities/password-hasing')
const passwordChecking = require('../utilities/password-checking')

class AuthService {
    authenticateUser(body) {
        let condition = {
            username: body.username,
            isActive: true
        }

        let value = {}

        return new Promise((resolve, reject) => {
            /** Check if username exists */
            authRepo.authenticate(condition).then((user) => {
                if (!user) {
                    /** Username not found */
                    value.message = constants.AUTHFAIL
                    reject(value)
                } else {
                    /** Check password */
                    passwordChecking(body.password, user.password)
                        .then((res) => {
                            if (res) {
                                value = userLoginModel(user._id, user.username)
                                value.token = tokenGenerator(value)
                                resolve(value)
                            } else {
                                value.message = constants.WRONGPASSWORD
                                reject(value)
                            }
                        })
                        .catch((err) => {
                            value.message = err
                            reject(value)
                        })
                }
            })
        })
    }

    createNewAccount(body) {
        let value = {}

        return new Promise((resolve, reject) => {
            /** Check if username exists */
            authRepo.authenticate({ username: body.username }).then((isUserAvailable) => {
                if (isUserAvailable) {
                    value.message = 'Username is already taken. Please try again!'
                    reject(value)
                } else {
                    /** Hash password */
                    passwordHashing(body.password)
                        .then((res) => {
                            body.isActive = true
                            body.password = res

                            /** Add new user to DB */
                            authRepo.createAccount(body).then((user) => {
                                var value = userLoginModel(user.id, body.username)
                                value.token = tokenGenerator(value)
                                resolve(value)
                            })
                        })
                        .catch((err) => {
                            value.message = err
                            reject(value)
                        })
                }
            })
        })
    }
}

module.exports = new AuthService()