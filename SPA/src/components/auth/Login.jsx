import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl } from 'react-bootstrap'

import Header from '../shared/Header.jsx'
import { updateUsername, updatePassword, authenticate, resetState, resetFieldValue } from '../../actions/authAction'
import removeToken from '../../utilities/removeToken'

class Login extends Component {
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
                    <h2 className="form-signin-heading">LOG IN</h2>
                    {auth.message ? <div className="alert alert-danger" role="alert">{auth.message}</div> : null}

                    <FormControl id="username" name="username" type="text" placeholder="Username" onChange={updateUsername} maxLength="50"
                        onKeyPress={(event) => this.pressEnter(event)} />
                    {auth.usernameMessage ? <p className="text-danger">{auth.usernameMessage}</p> : <br />}

                    <FormControl id="password" name="password" type="password" placeholder="Password" onChange={updatePassword} maxLength="50"
                        onKeyPress={(event) => this.pressEnter(event)} />
                    {auth.passwordMessage ? <p className="text-danger">{auth.passwordMessage}</p> : null}

                    <br />
                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.loginFormSubmit()}>Login</Button>
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

    loginFormSubmit() {
        const {dispatch} = this.props
        dispatch(authenticate(() => this.redirectToChat()))
    }

    pressEnter(event) {
        if (event.key == 'Enter') {
            this.loginFormSubmit()
        }
    }
}

Login.propTypes = {
    auth: React.PropTypes.object.isRequired
}

function select(state) {
    return {
        auth: state.authReducer
    }
}

export default connect(select)(Login)