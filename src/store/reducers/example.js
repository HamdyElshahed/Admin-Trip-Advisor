let arr = []; 
export default function exampleReducer(state = arr , action){
    switch (action.type) {
        case 'GET_EXAMPLE':
            arr= action.payload 
            return arr;
        default :
            return state;
    }
}