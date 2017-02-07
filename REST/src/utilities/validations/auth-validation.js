const form = require('express-form')
const field = form.field

const loginForm = form(
    field('username').trim().required().maxLength(50),
    field('password').trim().required().maxLength(50)
)

module.exports = {
    loginForm
}