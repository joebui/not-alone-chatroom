const authService = require('../services/auth-service')
const loginValidation = require('../utilities/validations/auth-validation')

module.exports = (app) => {
    /**
     * Authenticate user
     * URL: /auth
     * Method: POST
     * Body: username, password
     * Success: return {username, token}
     * Error: return {message}
     */
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

    /**
     * Create new account
     * URL: /auth/users
     * Method: POST
     * Body: username, password
     * Success: return {username, token}
     * Error: return {message}
     */
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