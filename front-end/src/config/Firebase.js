import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAfxMDgdSQDC87ji5l5A_5tPQY45D8aG5s",

    authDomain: "object-petita.firebaseapp.com",

    projectId: "object-petita",

    storageBucket: "object-petita.appspot.com",

    messagingSenderId: "294043572865",

    appId: "1:294043572865:web:7e3e471c441aa688548b80",

    measurementId: "G-2T64E64MGK"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };