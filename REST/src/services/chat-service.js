const Promise = require('promise')

const chatRepository = require('../../DAL/repositories/chat-repository')

class ChatService {
    addMessage(message) {
        chatRepository.addMessage(message)
    }

    getChatHistory(username) {
        return new Promise((resolve, reject) => {
            chatRepository.getChatHistory()
                .then((chat) => {
                    var i
                    for (i = 0; i < chat.length; i++) {
                        if (chat[i].username === username) {
                            chat[i].username = 'me'
                        }
                    }

                    resolve(chat)
                })
                .catch((err) => {
                    reject({ message: err })
                })
        })
    }
}

module.exports = new ChatService()