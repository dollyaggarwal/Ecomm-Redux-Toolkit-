//get inititalized database
import { initializeApp } from 'firebase/app';
//authentication
import { getAuth } from 'firebase/auth';
//firestore database
import { getFirestore } from 'firebase/firestore';
//realtime database
// import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
	apiKey: 'AIzaSyDd-0vVC67guATGdD2hf3JpcxE7ge78T7E',
	authDomain: 'ecommerceapp-2025.firebaseapp.com',
	projectId: 'ecommerceapp-2025',
	storageBucket: 'ecommerceapp-2025.appspot.com',
	messagingSenderId: '760618268205',
	appId: '1:760618268205:web:e608c8f6705f4ba6f4eaa4',
};
// All initialized configuration
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
// const database = getDatabase(firebaseApp);
