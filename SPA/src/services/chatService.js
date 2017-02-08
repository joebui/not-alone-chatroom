import baseService from './baseService'

import * as constants from '../utilities/constants'

export function postBroadcaseMessage(data, newMessageSuccess, newMessageError) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/api/chats', data)
            .then(() => {
                dispatch(newMessageSuccess(data))
            })
            .catch((err) => {
                dispatch(newMessageError(err))
            })
    }
}

export function getAllChatHistory(chatHistorySuccess, chatHistoryError) {
    return (dispatch) => {
        return baseService(constants.GET_METHOD, '/api/chats')
            .then((res) => {
                dispatch(chatHistorySuccess(res))
            })
            .catch((err) => {
                dispatch(chatHistoryError(err))
            })
    }
}

export function getOnlineList(onlineListSuccess) {
    return (dispatch) => {
        return baseService(constants.GET_METHOD, '/api/online')
            .then((res) => {
                dispatch(onlineListSuccess(res))
            })
    }
}

export function addYouAsNewOnlineUser() {
    baseService(constants.POST_METHOD, '/api/online', {})
}

export function removeYouFromOnlineList() {
    baseService(constants.DELETE_METHOD, '/api/online', {})
}