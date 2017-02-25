import { actions } from 'react-redux-form'

import baseService from './baseService'
import * as constants from '../utilities/constants'
import saveToLocalStorage from '../utilities/saveToLocalStorage'

export function postAuthenticate(data, redirectToChat) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/auth', data)
            .then((res) => {
                if ('message' in res.data) {
                    if (res.data.message.indexOf('Username') === 0) {
                        setModelDirty(dispatch, 'deep.login.username', res.data.message)
                    } else {
                        setModelDirty(dispatch, 'deep.login.password', res.data.message)
                    }
                } else {
                    setSuccessForm(dispatch, 'deep.login', res.data, redirectToChat)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export function postCreateAccount(data, redirectToChat) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/auth/users', data)
            .then((res) => {
                if ('message' in res.data) {
                    setModelDirty(dispatch, 'deep.newAccount.username', res.data.message)
                } else {
                    setSuccessForm(dispatch, 'deep.newAccount', res.data, redirectToChat)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function setModelDirty(dispatch, model, data) {    
    dispatch(actions.setErrors(model, data))    
}

function setSuccessForm(dispatch, model, data, redirectToChat) {
    dispatch(actions.setSubmitted(model))
    dispatch(actions.reset(model))
    saveToLocalStorage(data)
    redirectToChat()
}