import validator from 'validator'

import * as types from './actionTypes'
import * as accountService from '../services/authService'
import saveToLocalStorage from '../utilities/saveToLocalStorage'

let username = ''
let password = ''
let retypePassword = ''

export function authenticate(redirectToChat) {
    var result = loginValidation()

    if (result.success) {
        var data = JSON.stringify({ username: username.trim(), password: password.trim() })
        return accountService.postAuthenticate(data, authError, authSuccess, redirectToChat)
    } else {
        return authInvalidInput(result)
    }
}

export function createAccount(redirectToChat) {
    var result = createAccountValidation()

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

function loginValidation() {
    var result = {}
    var isUsernameEmpty = validator.isEmpty(username)
    var isPasswordEmpty = validator.isEmpty(password)

    if (isUsernameEmpty) result.usernameMessage = 'Username is required'

    if (isPasswordEmpty) result.passwordMessage = 'Password is required'

    if (!isUsernameEmpty && !isPasswordEmpty) result.success = true

    return result
}

function createAccountValidation() {
    var result = {}
    var isUsernameEmpty = validator.isEmpty(username)
    var isPasswordEmpty = validator.isEmpty(password)
    var isPasswordLength = validator.isLength(password, { min: 5, max: 50 })
    var isTwoPasswordsEqual = validator.equals(retypePassword, password);

    if (isUsernameEmpty) result.usernameMessage = 'Username is required'

    if (isPasswordEmpty) result.passwordMessage = 'Password is required'

    if (!isPasswordLength) result.passwordMessage = 'Length of password must be at least 5'

    if (!isTwoPasswordsEqual) result.retypePasswordMessage = 'Retype password and password do not match'

    if (!isUsernameEmpty && !isPasswordEmpty && isTwoPasswordsEqual) result.success = true

    return result
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

export function resetFieldValue() {
    username = ''
    password = ''
    retypePassword = ''
}