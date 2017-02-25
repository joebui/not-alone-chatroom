import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Control, Form, Errors } from 'react-redux-form'

import Header from '../shared/Header.jsx'
import * as authAction from '../../actions/authAction'
import removeToken from '../../utilities/removeToken'

class Login extends Component {
    componentWillMount() {
        removeToken()
    }

    render() {
        const required = (val) => val && val.length

        return (
            <div>
                <Header />
                <Form model="deep.login" onSubmit={(val) => this.handleLoginSubmit(val)} className="login-form">

                    <h2 className="form-signin-heading">LOG IN</h2>
                    <Control.text model=".username" maxLength="50" className="form-control" placeholder="Username"
                        validators={{
                            required
                        }}
                        validateOn="change" />
                    <Errors className="text-danger"
                        model=".username"
                        messages={{ required: "Username is required!" }}
                        show="touched"
                    />

                    <br />

                    <Control type="password" model=".password" maxLength="50" className="form-control" placeholder="Password"
                        validators={{
                            required
                        }}
                        validateOn="change" />
                    <Errors className="text-danger"
                        model=".password"
                        messages={{ required: "Password is required!" }}
                        show="touched"
                    />

                    <br />
                    <Button bsStyle="primary" bsSize="large" block type="submit">Login</Button>
                </Form>
            </div>
        )
    }

    redirectToChat() {
        const {router} = this.props
        router.push('/')
    }

    handleLoginSubmit(value) {
        const {dispatch} = this.props
        dispatch(authAction.authenticate(value, () => this.redirectToChat()))
    }
}

Login.propTypes = {}

export default connect()(Login)