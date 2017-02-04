import * as actionTypes from '../actions/actionTypes'

export default function authReducer(state = {
    usernameMessage: null,
    passwordMessage: null,
    retypePasswordMessage: null,
    message: null    
}, action) {
    switch (action.type) {
        case actionTypes.AUTH_RESET_STATE:
            return Object.assign({}, state, { usernameMessage: null, passwordMessage: null, retypePasswordMessage: null, message: null })

        case actionTypes.AUTH_SUCCESS:
            return Object.assign({}, state, { usernameMessage: null, passwordMessage: null, retypePasswordMessage: null, message: null })

        case actionTypes.AUTH_FAIL:
            return Object.assign({}, state, { usernameMessage: null, passwordMessage: null, retypePasswordMessage: null, message: action.user.message })

        case actionTypes.AUTH_INVALID_INPUT:
            return Object.assign({}, state, {
                usernameMessage: action.result.usernameMessage, passwordMessage: action.result.passwordMessage,
                retypePasswordMessage: action.result.retypePasswordMessage, message: null
            })

        default:
            return state
    }
}