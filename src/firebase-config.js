import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9JjHmXSY0TVyYw4kTZZWWE7i7UXBaUQ8",
    authDomain: "iti-trip-advisor.firebaseapp.com",
    projectId: "iti-trip-advisor",
    storageBucket: "iti-trip-advisor.appspot.com",
    messagingSenderId: "519761318248",
    appId: "1:519761318248:web:eed42966368fc9bc36c6dd"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);