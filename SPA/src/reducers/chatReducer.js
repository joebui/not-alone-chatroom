import * as actionTypes from '../actions/actionTypes'

export default function chatReducer(state = {
    conversation: [],
    online: [],
    errorMessage: null    
}, action) {
    switch (action.type) {
        case actionTypes.CHAT_ADD_MESSAGE_SUCCESS:
            var conversation = state.conversation.concat(newMessage(action.message))
            return Object.assign({}, state, { conversation: conversation, errorMessage: null })

        case actionTypes.CHAT_ADD_FRIEND_MESSAGE:
            var conversation = state.conversation.concat(newFriendMessage(action.message))
            return Object.assign({}, state, { conversation: conversation, errorMessage: null })

        case actionTypes.CHAT_GET_CHAT_HISTORY_SUCCESS:            
            return Object.assign({}, state, { conversation: action.chat })

        case actionTypes.CHAT_GET_CHAT_HISTORY_ERROR:
            return Object.assign({}, state, { errorMessage: action.message })

        case actionTypes.CHAT_ADD_MESSAGE_ERROR:
            return Object.assign({}, state, { errorMessage: action.message })

        default:
            return state
    }
}

function newMessage(action) {
    return [{
        username: 'me',
        message: action.message,
        dateTime: action.dateTime
    }]
}

function newFriendMessage(action) {
    return [{
        username: action.username,
        message: action.message,
        dateTime: action.dateTime
    }]
}