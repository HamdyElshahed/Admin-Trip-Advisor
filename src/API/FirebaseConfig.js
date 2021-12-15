import { initializeApp } from 'firebase/app';


const firebaseConfig={
    apiKey: "AIzaSyDh_ZXzbC-zsDUQ3ty-KsYPiH0qwAfJrCQ",
    authDomain: "iti-trip-advisor.firebaseapp.com",
    projectId: "iti-trip-advisor",
    storageBucket: "iti-trip-advisor.appspot.com",
    messagingSenderId: "519761318248",
    appId: "1:519761318248:web:4335666868b0d9b836c6dd"
}

export const app = initializeApp(firebaseConfig);