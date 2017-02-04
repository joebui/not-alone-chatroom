import baseService from './baseService'

import * as constants from '../utilities/constants'

export function postAuthenticate(data, authError, authSuccess, redirectToChat) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/auth', data)
            .then((res) => {
                if (res.data.message) {
                    dispatch(authError(res))
                } else {
                    dispatch(authSuccess(res))
                    redirectToChat()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export function postCreateAccount(data, authError, authSuccess, redirectToChat) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/auth/users', data)
            .then((res) => {
                if (res.data.message) {
                    dispatch(authError(res))
                } else {
                    dispatch(authSuccess(res))
                    redirectToChat()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}