const authService = require('../services/auth-service')
const loginValidation = require('../utilities/validations/auth-validation')

module.exports = (app) => {
    app.post('/auth', loginValidation.loginForm, (req, res) => {
        if (!req.form.isValid) {
            res.status(401).json(req.form.errors)
        } else {
            authService.authenticateUser(req.body)
                .then((value) => {
                    res.json(value)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    })

    app.post('/auth/users', loginValidation.loginForm, (req, res) => {
        if (!req.form.isValid) {
            res.status(401).json(req.form.errors)
        } else {
            authService.createNewAccount(req.body)
                .then((value) => {
                    res.json(value)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    })
}