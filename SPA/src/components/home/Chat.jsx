import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'
import { Row, Col } from 'react-bootstrap'

import { addMessage, addFriendMessage, showChatHistory } from '../../actions/chatAction'
import sendNotification from '../../utilities/notification'
import Header from '../shared/Header.jsx'
import MessageBubble from './message/MessageBubble.jsx'
import SendMessage from './SendMessage.jsx'
import OnlineList from './OnlineList.jsx'

class Chat extends Component {
    componentWillMount() {
        const {dispatch, socket} = this.props
        const currentUser = localStorage.username
        let isActive = true

        window.onfocus = () => { isActive = true }
        window.onblur = () => { isActive = false }

        dispatch(showChatHistory())

        socket.on('receiveMessage', (msg) => {
            if (msg.username !== currentUser) {
                dispatch(addFriendMessage(msg))
                if (!isActive) sendNotification(msg)
            }
        })
    }

    render() {
        const {dispatch, chat} = this.props

        return (
            <div>
                <Header />
                <div className="container">
                    <Row>
                        <Col md={9}>
                            {chat.errorMessage ? <div className="alert alert-danger" role="alert">{chat.errorMessage}</div> : null}
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    Chat
                                </div>
                                <div id="chat-body" className="panel-body">
                                    <ul className="chat">
                                        {
                                            chat.conversation.map((mes, index) =>
                                                <MessageBubble key={index} message={mes} />
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="panel-footer">
                                    <SendMessage onAddClick={() => this.addNewMessage()} />
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    Online
                                </div>
                                <OnlineList socket={this.props.socket} dispatch={dispatch} chat={chat} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.scrollConversationToBottom()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollConversationToBottom()
    }

    addNewMessage() {
        const {dispatch} = this.props
        dispatch(addMessage())
    }

    scrollConversationToBottom() {
        const panel = document.getElementById('chat-body')
        panel.scrollTop = panel.scrollHeight
    }
}

Chat.propTypes = {
    chat: React.PropTypes.object.isRequired
}

function select(state) {
    return {
        chat: state.chatReducer
    }
}

export default connect(select)(socketConnect(Chat))