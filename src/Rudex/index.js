import { createStore, combineReducers } from 'redux'
import tabbar from './Reducer/tabbar'

const reducer = combineReducers({
    isShow:tabbar
})
const store = createStore(reducer)

export default store