const chatService = require('../services/chat-service')

module.exports = (app, socket) => {
    app.get('/api/chats', (req, res) => {
        chatService.getChatHistory(req.decoded.username)
            .then((chat) => {
                res.status(200).json(chat)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    })

    app.post('/api/chats', (req, res) => {
        let message = { username: req.body.username, message: req.body.message, dateTime: req.body.dateTime }

        socket.emit('receiveMessage', message)
        chatService.addMessage(message)
        res.status(200).json({ message: 'broadcast message successfully' })
    })
}