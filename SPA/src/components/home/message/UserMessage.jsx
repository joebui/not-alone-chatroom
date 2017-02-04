import React, { Component, PropTypes } from 'react'

class UserMessage extends Component {
    render() {
        return (
            <li className="right clearfix">
                <div className="chat-body clearfix">
                    <div className="header">
                        <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>{this.props.dateTime}</small>
                        <strong className="pull-right primary-font">{this.props.username}</strong>
                    </div>
                    <p className="pull-right">
                        {this.props.message}
                    </p>
                </div>
            </li>
        )
    }
}

UserMessage.propTypes = {
    message: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    dateTime: React.PropTypes.string.isRequired
}

export default UserMessage