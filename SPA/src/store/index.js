import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import mainReducer from '../reducers'

const createAppStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore)

export default function configureStore() {
	const store = createAppStore(mainReducer)
	return store
}