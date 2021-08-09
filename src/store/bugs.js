import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from 'reselect';
import {apiCallBegan} from "./api";
import moment from "moment";

let lastId = 0
const bugsSlice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (state, action) => {
            state.loading = true
        },
        // bugs/bugsReceived
        bugsReceived: (state, action) => {
            state.list = (action.payload)
            state.loading = false
            state.lastFetch = Date.now()
        },
        bugsRequestFailed: (state, action) => {
            state.loading = false
        },
        bugAssignedToUser: (state, action) => {
            const {bugID, userID} = action.payload
            state.list.map(bug => bugID === bug.id ? bug.userID = userID : bug)
        },
        bugAdded: (state, action) => {
            // or u can still use destructuring / non-mutating ways
            state.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        bugResolved: (state, action) => {
            // or u can still use destructuring / non-mutating ways
            state.list.map(bug => bug.id === action.payload.id ? bug.resolved = true : bug)
            // return state
            // const index = state.findIndex(bug => bug.id === action.payload.id)
            // state[index].resolved = true
        },
        bugRemoved: (state, action) => {
            return state.list.filter(bug => bug.id !== action.payload.id)
        },
    }
})

export default bugsSlice.reducer
export const {bugAdded, bugResolved, bugRemoved,
    bugAssignedToUser, bugsReceived, bugsRequested,
    bugsRequestFailed} = bugsSlice.actions
// export const unresolvedBugsSelector = state =>
//   state.entities.bugs.filter(bug => !bug.resolved)

// Action Creators
const url = '/bugs'
export const loadBugs = () => (dispatch, getState) => {
    const {lastFetch} = getState().entities.bugs
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    console.log(diffInMinutes)
    if (diffInMinutes < 10) return
    dispatch(apiCallBegan({
        url: url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }))
}


// Memoization
export const unresolvedBugsSelector = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bugs => !bugs.resolved)
)

export const bugsByUserSelector = (userID) => createSelector(
  state => state.entities.bugs,
  bugs  => bugs.filter(bugs => bugs.userID === userID)
)


// Action Creators with Redux Toolkit
// export const bugAdded = createAction("bugAdded")
// export const bugRemoved = createAction("bugRemoved")
// export const bugResolved = createAction("bugResolved")



// Reducer with Redux Toolkit
// const reducer = createReducer([], {
//     [bugAdded.type]: (state, action) => {
//         // or u can still use destructuring / non-mutating ways
//         state.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false,
//         })
//
//     },
//     [bugResolved.type]: (state, action) => {
//         // or u can still use destructuring / non-mutating ways
//         state.map(bug => bug.id === action.payload.id ? bug.resolved = true : bug)
//         // return state
//         // const index = state.findIndex(bug => bug.id === action.payload.id)
//         // state[index].resolved = true
//     },
//     [bugRemoved.type]: (state, action) => {
//         return state.filter(bug => bug.id !== action.payload.id)
//     }
// })
// Reducer
// const reducer = (state = [], action) => {
//     switch (action.type){
//         case bugAdded.type:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false,
//                 }
//             ]
//         case bugRemoved.type:
//             return state.filter(bug => bug.id !== action.payload.id)
//         case bugResolved.type:
//             return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
//         default:
//             return state
//     }
// }

// export default reducer
