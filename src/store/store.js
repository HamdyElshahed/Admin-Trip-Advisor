import { createStore , applyMiddleware } from "redux";
import  combineReducers  from "./combinedReducers"
import thunk from "redux-thunk"
const store = createStore(combineReducers );

export default store ;