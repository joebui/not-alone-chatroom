import { combineReducers } from 'redux'

import chatReducer from './chatReducer'
import formReducer from './formReducer'

const mainReducer = combineReducers({    
    chatReducer,
    deep: formReducer
})

export default mainReducer