import {
    app
} from "../../API/FirebaseConfig"
import {
    getFirestore,
    collection,
    getDocs,
    where,
    query,

} from 'firebase/firestore';


const db = getFirestore(app);
/**
 * get all the users that have field 'posts' and not empty
 * @return a list of users objects that have posts
 */
export const getUsersList = () => {
    return async(dispatch) => {
        const q = query(collection(db, "Users"), where("posts", "!=", []));
        await getDocs(q).then(val => {
            const usersList = val.docs.map(doc => doc.data())
            console.log(usersList)
            dispatch({
                type: 'GET_USERS_POSTS',
                payload: usersList
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
