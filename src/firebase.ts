/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "presto-tech-2cd37.firebaseapp.com",
	projectId: "presto-tech-2cd37",
	storageBucket: "presto-tech-2cd37.appspot.com",
	messagingSenderId: "1004345189215",
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
