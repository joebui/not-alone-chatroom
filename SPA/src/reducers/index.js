import { combineReducers } from 'redux'

import authReducer from './authReducer'
import chatReducer from './chatReducer'

const mainReducer = combineReducers({
    authReducer,
    chatReducer
});

export default mainReducer