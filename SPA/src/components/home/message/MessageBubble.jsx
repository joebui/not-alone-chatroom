import React, { Component, PropTypes } from 'react'

import UserMessage from './UserMessage.jsx'
import FriendMessage from './FriendMessage.jsx'

class MessageBubble extends Component {
    render() {
        const {message} = this.props

        return (
            <div>
                {
                    message.username === 'me' ?
                        <UserMessage {...message} />
                        :
                        <FriendMessage {...message} />
                }
            </div>
        )
    }
}

MessageBubble.propTypes = {
    message: React.PropTypes.object.isRequired
}

export default MessageBubble