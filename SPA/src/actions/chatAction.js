import * as types from './actionTypes'
import * as chatService from '../services/chatService'

let message = ''

export function addMessage() {
    if (message !== '') {
        var msg = {
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

export function getOnlineList() {
    return chatService.getOnlineList(onlineListSuccess)
}

export function addNewOnlineMember(username) {
    return {
        type: types.CHAT_ADD_ONLINE_MEMBER,
        username: username
    }
}

export function removeFriendFromOnlineList(username) {
    return {
        type: types.CHAT_REMOVE_FRIEND_ONLINE_LIST,
        username: username
    }
}

export function removeYouFromOnlineList() {
    chatService.removeYouFromOnlineList()    
}

export function addYouAsNewOnlineUser() {
    chatService.addYouAsNewOnlineUser()
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

function onlineListSuccess(res) {
    return {
        type: types.CHAT_GET_ONLINE_LIST,
        online: res.data
    }
}