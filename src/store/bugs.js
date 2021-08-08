import {createAction, createReducer} from "@reduxjs/toolkit";

// Action Creators with Redux Toolkit
export const bugAdded = createAction("bugAdded")
export const bugRemoved = createAction("bugRemoved")
export const bugResolved = createAction("bugResolved")


let lastId = 0
// Reducer with Redux Toolkit
const reducer = createReducer([], {
    [bugAdded.type]: (state, action) => {
        state.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false,
        })

    },
    [bugResolved.type]: (state, action) => {
        return state.map(bug => bug.id === action.payload.id ? bug.resolved = true : bug)
        // const index = state.findIndex(bug => bug.id === action.payload.id)
        // state[index].resolved = true
    },
    [bugRemoved.type]: (state, action) => {
        return state.filter(bug => bug.id !== action.payload.id)
    }
})
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

export default reducer
