import store from "./store";
import * as actions from './actionTypes'
import { bugAdded, bugResolved } from "./actionCreator";

// Subscribe to store 
// UI components should subscribe to the store to get notified of changes 

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState())
})

store.dispatch(bugAdded("Bug 1"))

store.dispatch(bugResolved(1))

unsubscribe()

store.dispatch({
    type: actions.BUG_REMOVED, 
    payload: {
        id: 1
    }
})

console.log(store.getState())