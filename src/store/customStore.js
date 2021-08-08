import reducer from './bugs'
const createStore = (reducer) => {
    let state
    let listeners = []
    const getState = () => {
        return state
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++){
            listeners[i]()
        }
    }
    const subscribe = (listener) => {
        listeners.push(listener)
    }
    return {
        dispatch,
        getState,
        subscribe
    }
}

export default createStore(reducer)