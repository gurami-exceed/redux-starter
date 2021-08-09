import configureStore from './store/configureStore'
import {
	bugAdded, bugRemoved, bugResolved, bugAssignedToUser,
	unresolvedBugsSelector, bugsByUserSelector, loadBugs
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import { apiCallSuccess, apiCallBegan, apiCallFailed } from "./store/api";

const store = configureStore()

store.dispatch(loadBugs())
setTimeout(() => {
	store.dispatch(loadBugs())
}, 2000)
// const unsubscribe = store.subscribe(()=> {
//     console.log('Store Changed', store.getState())
// })
// store.dispatch({
//   type: 'error',
//   payload: {message: 'an error occured'}
// })

// store.dispatch((dispatch, getState) => {
//   dispatch({type: 'bugsReceived', bugs: [1,2,3]})
//   console.log(getState())
// })
// store.dispatch(userAdded({name: 'User 1'}))
// store.dispatch(userAdded({name: 'User 2'}))
//
// store.dispatch(projectAdded({name: 'prohject 1'}))
//
// store.dispatch(bugAdded({description: 'bug1'}))
// store.dispatch(bugAdded({description: 'bug2'}))
// store.dispatch(bugAdded({description: 'bug3'}))
// store.dispatch(bugResolved({id: 1}))
// store.dispatch(bugRemoved({id: 2}))

// store.dispatch(bugAssignedToUser({bugID: 1, userID: 1}))

// const unresolvedBugs = unresolvedBugsSelector(store.getState())
// const bugs = bugsByUserSelector(1)(store.getState())
// console.log(unresolvedBugs)
// console.log(bugs)

// unsubscribe()



