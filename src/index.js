import configureStore from './store/configureStore'
import {bugAdded, bugRemoved, bugResolved} from "./store/bugs";

const store = configureStore()

const unsubscribe = store.subscribe(()=> {
    console.log('Store Changed', store.getState())
})

store.dispatch(bugAdded('bug1'))
store.dispatch(bugAdded('bug2'))
store.dispatch(bugAdded('bug3'))
store.dispatch(bugResolved(1))

unsubscribe()



