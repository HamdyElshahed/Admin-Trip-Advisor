import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { app, db } from "../../config/firebase";

export const getUsers = async () => {
    let users = [];
    let res = await onSnapshot(collection(db, "Users"), (doc) => {
         doc.forEach((d) => {
           users.push(d.data());
         });
       });
    return{type: 'GET_USERS' , payload : users|| []}
}