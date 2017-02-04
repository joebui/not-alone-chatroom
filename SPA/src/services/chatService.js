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