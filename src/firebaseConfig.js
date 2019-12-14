import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBiVlm4iDHsKzgtO9wDicKOMPVFltiFEX0",
    authDomain: "fetch-api-1e7be.firebaseapp.com",
    databaseURL: "https://fetch-api-1e7be.firebaseio.com",
    projectId: "fetch-api-1e7be",
    storageBucket: "fetch-api-1e7be.appspot.com",
    messagingSenderId: "838497134529",
    appId: "1:838497134529:web:3fdf7e212bfbd847ecb140"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database()
export const auth = firebase.auth()
