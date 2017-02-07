const form = require('express-form')
const field = form.field

const chatForm = form(
    field('username').trim().required(),
    field('message').trim().required(),
    field('dateTime').trim().required()
)

module.exports = {
    chatForm
}