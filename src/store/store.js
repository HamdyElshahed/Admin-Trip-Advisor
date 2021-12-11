import { createStore , applyMiddleware } from "redux";
import  combineReducers  from "./combinedReducers"
import thunk from "redux-thunk"
const store = createStore(combineReducers , applyMiddleware(thunk));

export default store ;