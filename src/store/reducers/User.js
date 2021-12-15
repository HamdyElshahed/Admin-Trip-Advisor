export default  function RestaurantsReducer(state=[],action) {
    switch (action.type) {
        case 'GET_USERS_POSTS':
            // console.log(action.payload)
            state=action.payload
            return  action.payload;
            
        default:
            return state;
    }
}