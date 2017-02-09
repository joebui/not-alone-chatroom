const chatService = require('../services/chat-service')
const chatValidation = require('../utilities/validations/chat-validation')

module.exports = (app, socket) => {
    /**
     * Retrieve conversation history
     * URL: /api/chats
     * Method: GET     
     * Success: return {_id, username, message, dateTime}
     * Error: return {message}
     */
    app.get('/api/chats', (req, res) => {
        chatService.getChatHistory(req.decoded.username)
            .then((chat) => {
                res.status(200).json(chat)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    })

    /**
     * Add new message to conversation history
     * URL: /api/chats
     * Method: POST     
     * Body: {username, message, dateTime}
     * Success: return {message}
     * Error: return {message}
     */
    app.post('/api/chats', chatValidation.chatForm, (req, res) => {
        let message = { username: req.decoded.username, message: req.body.message, dateTime: req.body.dateTime }
        if (!req.form.isValid) {
            res.status(401).json(req.form.errors)
        } else {
            socket.emit('receiveMessage', message)
            chatService.addMessage(message)
            res.status(200).json({ message: 'broadcast message successfully' })
        }
    })

    /**
     * Retrieve conversation history
     * URL: /api/chats
     * Method: GET     
     * Success: return {_id, username, message, dateTime}
     * Error: return {message}
     */
    app.get('/api/online', (req, res) => {
        res.status(200).json(chatService.getOnlineList())
    })

    /**
     * Add new online member to online list
     * URL: /api/online
     * Method: POST     
     * Body: {username}
     * Success: return {message}     
     */
    app.post('/api/online', (req, res) => {
        chatService.addOnlineMember(req.decoded.username)
        socket.emit('addOnlineUser', req.decoded.username)
        res.status(200).json({ message: 'add online member successfully' })
    })

    /**
     * Remove online member to online list
     * URL: /api/online
     * Method: DELETE     
     * Body: {username}
     * Success: return {message}     
     */
    app.delete('/api/online', (req, res) => {        
        chatService.removeOnlineMember(req.decoded.username)
        socket.emit('removeOnlineUser', req.decoded.username)
        res.status(200).json({ message: 'remove online member successfully' })
    })
}