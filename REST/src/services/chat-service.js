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
}

module.exports = new ChatService()