const form = require('express-form')
const field = form.field

const chatForm = form(    
    field('message').trim().required(),
    field('dateTime').trim().required()
)

module.exports = {
    chatForm
}