import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'

import configureStore from './store'
import checkTokenAvailability from './utilities/checkTokenAvailability'
import { BASE_URL } from './utilities/constants'
import Chat from './components/home/Chat.jsx'
import Login from './components/auth/Login.jsx'
import NotFound from './components/shared/404.jsx'
import NewAccount from './components/auth/NewAccount.jsx'

const store = configureStore()
const socket = io.connect(BASE_URL)

if (Notification.permission !== 'denied') Notification.requestPermission()

render(
    <Provider store={store}>
        <SocketProvider socket={socket}>
            <Router history={browserHistory}>
                <Route onEnter={checkTokenAvailability} path='/' component={Chat} />
                <Route path='login' component={Login} />
                <Route path='new-account' component={NewAccount} />
                <Route path='*' component={NotFound} />
            </Router>
        </SocketProvider>
    </Provider>,

    document.getElementById('app')
)