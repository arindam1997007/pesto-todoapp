/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app"
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth"
import {
	Firestore,
	connectFirestoreEmulator,
	getFirestore,
} from "firebase/firestore"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "presto-tech-2cd37.firebaseapp.com",
	projectId: "presto-tech-2cd37",
	storageBucket: "presto-tech-2cd37.appspot.com",
	messagingSenderId: "1004345189215",
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let auth: Auth, firestoreDb: Firestore

if (import.meta.env.MODE === "PROD") {
	// Initialize Firebase
	const app = initializeApp(firebaseConfig)
	auth = getAuth(app)
	firestoreDb = getFirestore(app)
} else {
	initializeApp(firebaseConfig)
	auth = getAuth()
	firestoreDb = getFirestore()
	connectAuthEmulator(auth, "http://127.0.0.1:9099")
	connectFirestoreEmulator(firestoreDb, "127.0.0.1", 8080)
}

export { auth, firestoreDb }
