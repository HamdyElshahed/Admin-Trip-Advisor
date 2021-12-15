import { combineReducers } from "redux";
import usersReducer from './reducers/users';
import Restaurant from './reducers/Restaurant';
import User from './reducers/User';
export default combineReducers({
    users : usersReducer,
    restaurant:Restaurant,
    user:User
})

 