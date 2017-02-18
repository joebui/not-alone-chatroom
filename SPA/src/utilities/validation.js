import validator from 'validator'

export function loginValidation(username, password) {
    var result = {}
    var isUsernameEmpty = validator.isEmpty(username)
    var isPasswordEmpty = validator.isEmpty(password)

    if (isUsernameEmpty) result.usernameMessage = 'Username is required'

    if (isPasswordEmpty) result.passwordMessage = 'Password is required'

    if (!isUsernameEmpty && !isPasswordEmpty) result.success = true

    return result
}

export function createAccountValidation(username, password, retypePassword) {
    var result = {}
    var isUsernameEmpty = validator.isEmpty(username)
    var isPasswordEmpty = validator.isEmpty(password)
    var isPasswordLength = validator.isLength(password, { min: 5, max: 50 })
    var isTwoPasswordsEqual = validator.equals(retypePassword, password)

    if (isUsernameEmpty) result.usernameMessage = 'Username is required'

    if (isPasswordEmpty) result.passwordMessage = 'Password is required'

    if (!isPasswordLength) result.passwordMessage = 'Length of password must be at least 5'

    if (!isTwoPasswordsEqual) result.retypePasswordMessage = 'Retype password and password do not match'

    if (!isUsernameEmpty && !isPasswordEmpty && isTwoPasswordsEqual) result.success = true

    return result
}