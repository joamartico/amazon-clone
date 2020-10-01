import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyBYSn3WWRdtEK4u2YuAjI44Gk_-8_weuAI",
	authDomain: "clone-1ab4e.firebaseapp.com",
	databaseURL: "https://clone-1ab4e.firebaseio.com",
	projectId: "clone-1ab4e",
	storageBucket: "clone-1ab4e.appspot.com",
	messagingSenderId: "324914838066",
	appId: "1:324914838066:web:d9593a9d45bee1ab865a2b",
	measurementId: "G-Z8J5TCDEVN",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();


