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


export const  getTempRestaurantById = (id, uid) => {
    // console.log('id from get RestaurantById fun', id)
    return  async(dispatch) => {

        const q = query(collection(db,  `Users/${uid}/posts`), where("id", "==", id));

         await getDocs(q).then(post=>{
            const postList = post.docs.map(doc => doc.data())
            console.log(postList);
            dispatch({
                type: 'GET_TEMP_RESTAURANT',
                payload: postList
            })
        }).catch(err => {
            console.log(err)
        })
        
       

    }
}