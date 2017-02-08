import React, { Component } from 'react'
import { Link } from 'react-router'

class TokenNavBar extends Component {
    render() {
        const username = localStorage.username

        return (
            <ul className='nav navbar-nav navbar-right'>
                <li><Link>Welcome, {username}</Link></li>
                <li><Link to={'/login'}>Logout</Link></li>
            </ul>
        );
    }
}

export default TokenNavBar