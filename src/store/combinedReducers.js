import { combineReducers } from "redux";
<<<<<<< HEAD
import usersReducer from './reducers/users';

export default combineReducers({
    users : usersReducer,
})
=======
import Restaurant from './reducers/Restaurant';
import User from './reducers/User';
 
export default combineReducers({
    restaurant:Restaurant,
    user:User
}) 
>>>>>>> 581054259d2859f453bbef55d66fd6a339d39868
