const jwt = require('jsonwebtoken')
const config = require('config')

const constants = require('../utilities/constants')

module.exports = (req, res, next) => {
    const tokenString = req.headers.authorization

    if (tokenString && tokenString.split(' ')[0] === 'Bearer') {
        jwt.verify(tokenString.split(' ')[1], config.get('auth.secret'), (err, decoded) => {
            if (err) {
                res.status(403).json({ message: err.message })
            } else {
                /** Save decoded token to request for use in other routes */
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(403).json({ message: constants.NOTOKEN })
    }
}