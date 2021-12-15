export default function usersReducer(state = {} , action){
    switch (action.type) {
        case 'GET_USERS':
            state ={
                users :action.payload 
            }
            return state;
        default :
            return state;
    }
}