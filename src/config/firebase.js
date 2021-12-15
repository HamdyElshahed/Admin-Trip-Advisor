import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig= {
    projectId: 'iti-trip-advisor',
    appId: '1:519761318248:web:794dd9b4c4f1816236c6dd',
    storageBucket: 'iti-trip-advisor.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDh_ZXzbC-zsDUQ3ty-KsYPiH0qwAfJrCQ',
    authDomain: 'iti-trip-advisor.firebaseapp.com',
    messagingSenderId: '519761318248',
}
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);