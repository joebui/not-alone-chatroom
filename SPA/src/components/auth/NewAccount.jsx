import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl } from 'react-bootstrap'

import Header from '../shared/Header.jsx'
import { updateUsername, updatePassword, updateRetypePassword, createAccount, resetState, resetFieldValue } from '../../actions/authAction'
import removeToken from '../../utilities/removeToken'

class NewAccount extends Component {
    componentWillMount() {
        removeToken()
        this.props.dispatch(resetState())
    }

    render() {
        const {auth} = this.props

        return (
            <div>
                <Header />
                <div className="login-form">
                    <h2 className="form-signin-heading">CREATE ACCOUNT</h2>
                    {auth.message ? <div className="alert alert-danger" role="alert">{auth.message}</div> : null}

                    <FormControl id="username" name="username" type="text" placeholder="Username" onChange={updateUsername} maxLength="50"
                        onKeyPress={(event) => this.pressEnter(event)} />
                    {auth.usernameMessage ? <p className="text-danger">{auth.usernameMessage}</p> : <br />}

                    <FormControl id="password" name="password" type="password" placeholder="Password" onChange={updatePassword} maxLength="50"
                        onKeyPress={(event) => this.pressEnter(event)} />
                    {auth.passwordMessage ? <p className="text-danger">{auth.passwordMessage}</p> : <br />}

                    <FormControl id="re-password" name="re-password" type="password" placeholder="Retype password" onChange={updateRetypePassword} maxLength="50"
                        onKeyPress={(event) => this.pressEnter(event)} />
                    {auth.retypePasswordMessage ? <p className="text-danger">{auth.retypePasswordMessage}</p> : null}

                    <br />
                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.createAccountFormSubmit()}>Create and sign in</Button>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        resetFieldValue()
    }

    redirectToChat() {
        const {router} = this.props
        router.push('/')
    }

    createAccountFormSubmit() {
        const {dispatch} = this.props
        dispatch(createAccount(() => this.redirectToChat()))
    }

    pressEnter(event) {
        if (event.key == 'Enter') {
            this.createAccountFormSubmit()
        }
    }
}

NewAccount.propTypes = {
    auth: React.PropTypes.object.isRequired
}

function select(state) {
    return {
        auth: state.authReducer
    }
}

export default connect(select)(NewAccount)