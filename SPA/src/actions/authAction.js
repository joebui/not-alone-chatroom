import * as types from './actionTypes'
import * as accountService from '../services/authService'

export function authenticate(value, redirectToChat) {
    var data = JSON.stringify({ username: value.username.trim(), password: value.password.trim() })
    return accountService.postAuthenticate(data, redirectToChat)
}

export function createAccount(value, redirectToChat) {
    var data = JSON.stringify({ username: value.username.trim(), password: value.password.trim() })
    return accountService.postCreateAccount(data, redirectToChat)
}