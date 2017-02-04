import React, { Component } from 'react'
import { Link } from 'react-router'

class NoTokenNavBar extends Component {
    render() {
        return (
            <ul className='nav navbar-nav navbar-right'>                
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/new-account'}>Create account</Link></li>
            </ul>
        )
    }
}

export default NoTokenNavBar