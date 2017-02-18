import React, { Component, PropTypes } from 'react'

class FriendMessage extends Component {
    render() {
        return (
            <li className="left clearfix">
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{this.props.username}</strong>
                        <small className="pull-right text-muted"><span className="glyphicon glyphicon-time"></span>{this.props.dateTime}</small>
                    </div>
                    <p>
                        {this.props.message}
                    </p>
                </div>
            </li>
        )
    }
}

FriendMessage.propTypes = {
    message: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    dateTime: React.PropTypes.string.isRequired
}

export default FriendMessage