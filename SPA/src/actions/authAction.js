import * as types from './actionTypes'
import * as accountService from '../services/authService'
import saveToLocalStorage from '../utilities/saveToLocalStorage'
import * as authValidation from '../utilities/validation'

let username = ''
let password = ''
let retypePassword = ''

export function authenticate(redirectToChat) {
    var result = authValidation.loginValidation(username, password)

    if (result.success) {
        var data = JSON.stringify({ username: username.trim(), password: password.trim() })
        return accountService.postAuthenticate(data, authError, authSuccess, redirectToChat)
    } else {
        return authInvalidInput(result)
    }
}

export function createAccount(redirectToChat) {
    var result = authValidation.createAccountValidation(username, password, retypePassword)

    if (result.success) {
        var data = JSON.stringify({ username: username.trim(), password: password.trim() })
        return accountService.postCreateAccount(data, authError, authSuccess, redirectToChat)
    } else {
        return authInvalidInput(result)
    }
}

export function resetState() {
    return {
        type: types.AUTH_RESET_STATE
    }
}

export function updateUsername(e) {
    username = e.target.value
}

export function updatePassword(e) {
    password = e.target.value
}

export function updateRetypePassword(e) {
    retypePassword = e.target.value
}

export function resetFieldValue() {
    username = ''
    password = ''
    retypePassword = ''
}

function authSuccess(res) {
    saveToLocalStorage(res.data)
    return {
        type: types.AUTH_SUCCESS,
        user: res.data,
        status: res.status
    }
}

function authError(err) {
    return {
        type: types.AUTH_FAIL,
        user: err.data,
        status: err.status
    }
}

function authInvalidInput(result) {
    return {
        type: types.AUTH_INVALID_INPUT,
        result: result
    }
}