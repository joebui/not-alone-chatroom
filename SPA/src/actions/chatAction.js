import * as types from './actionTypes'
import * as chatService from '../services/chatService'

let message = ''

export function addMessage() {
    if (message !== '') {                
        var msg = {
            username: localStorage.username,
            message: message.trim(),
            dateTime: getCurrentDateTime()
        }
        message = ''

        return chatService.postBroadcaseMessage(msg, newMessageSuccess, newMessageError)
    } else {
        return noNewMessage()
    }
}

export function showChatHistory() {
    return chatService.getAllChatHistory(chatHistorySuccess, chatHistoryError)
}

export function updateMessage(e) {
    message = e.target.value
}

function getCurrentDateTime() {
    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return date + ' ' + time
}

export function addFriendMessage(msg) {
    return {
        type: types.CHAT_ADD_FRIEND_MESSAGE,
        message: msg
    }
}

function newMessageSuccess(msg) {
    return {
        type: types.CHAT_ADD_MESSAGE_SUCCESS,
        message: msg
    }
}

function newMessageError(err) {
    return {
        type: types.CHAT_ADD_MESSAGE_ERROR,
        message: err
    }
}

function chatHistorySuccess(res) {
    return {
        type: types.CHAT_GET_CHAT_HISTORY_SUCCESS,
        chat: res.data        
    }
}

function chatHistoryError(err) {
    return {
        type: types.CHAT_GET_CHAT_HISTORY_ERROR,
        message: err.message        
    }
}

function noNewMessage() {
    return { type: '' }
}