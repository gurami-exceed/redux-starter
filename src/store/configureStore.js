import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension'
import reducer from './bugs'

const configureStore = () => createStore(reducer, devToolsEnhancer({trace: true}))

export default configureStore