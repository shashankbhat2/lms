import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyCumX0m0srx_dYOfQzyYKwHKV6cB0aADGs",
    authDomain: "elearning-project-5423b.firebaseapp.com",
    projectId: "elearning-project-5423b",
    storageBucket: "elearning-project-5423b.appspot.com",
    messagingSenderId: "144615201852",
    appId: "1:144615201852:web:5b6955d823cf4c6349b739",
    measurementId: "G-K4FRGS3KCY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();
const functions = firebase.functions();

export {
    storage,
    functions,
    firebase as default
}
