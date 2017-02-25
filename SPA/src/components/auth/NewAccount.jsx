import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Control, Form, Errors } from 'react-redux-form'

import Header from '../shared/Header.jsx'
import * as authAction from '../../actions/authAction'
import removeToken from '../../utilities/removeToken'

class NewAccount extends Component {
    componentWillMount() {
        removeToken()
    }

    render() {
        const usernameRequired = (val) => val && val.length
        const passwordRequired = (val) => val && val.length > 5

        return (
            <div>
                <Header />
                <Form model="deep.newAccount" onSubmit={(val) => this.handleCreateAccountSubmit(val)} className="login-form"
                    validators={{
                        '': { passwordsMatch: (vals) => vals.retypePassword === vals.password }
                    }}>

                    <h2 className="form-signin-heading">NEW ACCOUNT</h2>
                    <Control.text model=".username" maxLength="50" className="form-control" placeholder="Username"
                        validators={{
                            usernameRequired
                        }}
                        validateOn="change" />
                    <Errors className="text-danger"
                        model=".username"
                        messages={{ usernameRequired: "Username is required!" }}
                        show="touched"
                    />

                    <br />

                    <Control type="password" model=".password" maxLength="50" className="form-control" placeholder="Password"
                        validators={{
                            passwordRequired
                        }}
                        validateOn="change" />
                    <Errors className="text-danger"
                        model=".password"
                        messages={{ passwordRequired: "Password must have more than 5 characters!" }}
                        show="touched"
                    />

                    <br />

                    <Control type="password" model=".retypePassword" maxLength="50" className="form-control" placeholder="Retype password"
                        validateOn="change" />
                    <Errors className="text-danger"
                        model="deep.newAccount"
                        messages={{ passwordsMatch: "Retype password does not match" }}
                        show="touched"
                    />

                    <br />
                    <Button bsStyle="primary" bsSize="large" block type="submit">Create</Button>
                </Form>
            </div>
        )
    }

    redirectToChat() {
        const {router} = this.props
        router.push('/')
    }

    handleCreateAccountSubmit(value) {
        const {dispatch} = this.props
        dispatch(authAction.createAccount(value, () => this.redirectToChat()))
    }
}

NewAccount.propTypes = {}

export default connect()(NewAccount)