const Promise = require('promise')

const chatRepository = require('../../DAL/repositories/chat-repository')

const onlineList = []

class ChatService {
    addMessage(message) {
        chatRepository.addMessage(message)
    }

    getChatHistory(username) {
        return new Promise((resolve, reject) => {
            chatRepository.getChatHistory()
                .then((chat) => {
                    let msg
                    for (msg of chat) {
                        if (msg.username === username) {
                            msg.username = 'me'
                        }
                    }

                    resolve(chat)
                })
                .catch((err) => {
                    reject({ message: err })
                })
        })
    }

    getOnlineList() {
        return onlineList
    }

    addOnlineMember(username) {
        if (onlineList.indexOf(username) === -1)
            onlineList.push(username)
    }

    removeOnlineMember(username) {
        var index = onlineList.indexOf(username)
        onlineList.splice(index, 1)
    }
}

module.exports = new ChatService()