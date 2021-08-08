import configureStore from './store/configureStore'
import {bugAdded, bugRemoved, bugResolved} from "./store/bugs";

const store = configureStore()

const unsubscribe = store.subscribe(()=> {
    console.log('Store Changed', store.getState())
})

store.dispatch(bugAdded({description: 'bug1'}))
store.dispatch(bugAdded({description: 'bug2'}))
store.dispatch(bugAdded({description: 'bug3'}))
store.dispatch(bugResolved({id: 1}))
store.dispatch(bugRemoved({id: 2}))

unsubscribe()



