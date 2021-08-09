// Plain Redux
// import {createStore} from 'redux';
// import {devToolsEnhancer} from 'redux-devtools-extension'
// import reducer from './bugs'
//
// const configureStore = () => createStore(reducer, devToolsEnhancer({trace: true}))
//
// export default configureStore

// Redux Toolkit
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from "./middleware/logger";
// import func from "./middleware/func";
import toast from './middleware/toast'
import api from "./middleware/api";
// import reducer from './bugs'
import reducer from './reducer'
export default () => configureStore({
	reducer,
	middleware: [
		...getDefaultMiddleware(),
		logger({destination: 'console'}),
		toast,
		api
		// func
	]
})



