import { combineForms } from 'react-redux-form'

const login = { username: '', password: '' }
const newAccount = { username: '', password: '', retypePassword: '' }

const form = combineForms({
    login,
    newAccount
}, 'deep')

export default form