import { combineReducers } from "redux";
import exampleReducer from './reducers/example';

export default combineReducers({
    example : exampleReducer,
})