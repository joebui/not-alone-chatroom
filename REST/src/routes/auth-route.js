const authService = require('../services/auth-service')

module.exports = (app) => {
    app.post('/auth', (req, res) => {
        authService.authenticateUser(req.body)
            .then((value) => {
                res.json(value)
            })
            .catch((err) => {
                res.json(err)
            })
    })

    app.post('/auth/users', (req, res) => {
        authService.createNewAccount(req.body)
            .then((value) => {
                res.json(value)
            })
            .catch((err) => {
                res.json(err)
            })
    })
}