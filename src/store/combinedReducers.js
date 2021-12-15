import { combineReducers } from "redux";
import Restaurant from './reducers/Restaurant';
import User from './reducers/User';
 
export default combineReducers({
    restaurant:Restaurant,
    user:User
}) 