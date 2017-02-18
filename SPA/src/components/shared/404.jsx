import React, {Component} from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
    render() {
        return (                            
            <div className='container'>
                <h1>404 - Page not found</h1>
                <Link className="navbar-brand" to={'/'}>Back to main page</Link>
            </div>            
        )
    }
}

export default NotFound