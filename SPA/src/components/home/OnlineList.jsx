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
            console.log('socket');
            dispatch(chatAction.removeFriendFromOnlineList(user))
        })

        window.onbeforeunload = () => {            
            chatAction.removeYouFromOnlineList()
        }
    }

    render() {
        const {chat} = this.props

        return (
            <div>
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
}

OnlineList.propTypes = {

}

export default OnlineList