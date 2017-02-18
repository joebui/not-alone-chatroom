import React, { Component, PropTypes } from 'react'

import * as chatAction from '../../actions/chatAction'

class OnlineList extends Component {
    componentWillMount() {
        const {socket, dispatch} = this.props
        const currentUser = localStorage.username

        dispatch(chatAction.getOnlineList())
        chatAction.addYouAsNewOnlineUser()

        socket.on('addOnlineUser', (user) => {            
            if (user !== currentUser) dispatch(chatAction.addNewOnlineMember(user))
        })

        socket.on('removeOnlineUser', (user) => {            
            dispatch(chatAction.removeFriendFromOnlineList(user))
        })

        window.onbeforeunload = () => {            
            chatAction.removeYouFromOnlineList()
        }
    }

    render() {
        const {chat} = this.props

        return (
            <div id="online-list" className="panel-body-online">
                <ul className="chat">
                    {
                        chat.online.map((item, index) =>
                            <li key={index} className="left clearfix">{item}</li>
                        )
                    }
                </ul>
            </div>
        )
    }

    componentWillUnmount() {
        chatAction.removeYouFromOnlineList()
    }

    componentDidMount() {
        this.scrollOnlineListToBottom()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollOnlineListToBottom()
    }

    scrollOnlineListToBottom() {
        const panel = document.getElementById('online-list')
        panel.scrollTop = panel.scrollHeight
    }
}

OnlineList.propTypes = {
    socket: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.any.isRequired,
    chat: React.PropTypes.object.isRequired
}

export default OnlineList