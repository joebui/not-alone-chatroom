import React, { Component, PropTypes } from 'react'
import { Button, FormControl } from 'react-bootstrap'

import { updateMessage } from '../../actions/chatAction'

class SendMessage extends Component {
    render() {
        return (
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Type your message here..." maxLength="500" onChange={updateMessage} ref="input"
                    onKeyPress={(event) => this.pressEnter(event)} />
                <span className="input-group-btn">
                    <Button bsStyle="primary" onClick={() => this.handleClick()}>Send</Button>
                </span>
            </div>
        )
    }

    pressEnter(event) {
        if (event.key == 'Enter') {
            this.handleClick()
        }
    }

    handleClick() {
        const node = this.refs.input
        node.value = ''

        this.props.onAddClick()
    }
}

SendMessage.propTypes = {
    onAddClick: React.PropTypes.func.isRequired
}

export default SendMessage