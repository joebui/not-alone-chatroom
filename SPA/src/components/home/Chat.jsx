import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'
import { Row, Col } from 'react-bootstrap'

import { addMessage, addFriendMessage, showChatHistory } from '../../actions/chatAction'
import Header from '../shared/Header.jsx'
import MessageBubble from './message/MessageBubble.jsx'
import SendMessage from './SendMessage.jsx'
import OnlineList from './OnlineList.jsx'

class Chat extends Component {
    componentWillMount() {
        const {dispatch, socket} = this.props
        const currentUser = localStorage.username

        dispatch(showChatHistory())

        socket.on('receiveMessage', (msg) => {
            if (msg.username !== currentUser) dispatch(addFriendMessage(msg))
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
                                <div className="panel-body">
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
                                <div className="panel-body-online">
                                    <OnlineList socket={this.props.socket} dispatch={dispatch} chat={chat} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    addNewMessage() {
        const {dispatch} = this.props
        dispatch(addMessage())
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