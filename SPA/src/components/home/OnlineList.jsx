import React, { Component, PropTypes } from 'react'

import { addNewOnlineMember, getOnlineList, addYouAsNewOnlineUser, removeFriendFromOnlineList, removeYouFromOnlineList } from '../../actions/chatAction'

class OnlineList extends Component {
    componentWillMount() {
        const {socket, dispatch} = this.props
        const currentUser = localStorage.username

        dispatch(getOnlineList())
        addYouAsNewOnlineUser()

        socket.on('addOnlineUser', (user) => {            
            if (user !== currentUser) dispatch(addNewOnlineMember(user))
        })

        socket.on('removeOnlineUser', (user) => {
            console.log('socket');
            dispatch(removeFriendFromOnlineList(user))
        })

        window.onbeforeunload = () => {            
            removeYouFromOnlineList()
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
        removeYouFromOnlineList()
    }
}

OnlineList.propTypes = {

}

export default OnlineList