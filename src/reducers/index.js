import { combineReducers } from 'redux'

import auth from './auth'
import accesses from './accesses'
import roleAccesses from './roleAccesses'
import notifications from './notifications'

import posts from './posts'

const rootReducer = combineReducers({
    auth,
    accesses,
    roleAccesses,
    notifications,
    posts
})

export default rootReducer
