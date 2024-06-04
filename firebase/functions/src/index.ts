/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { User } from "firebase/auth"
import { auth } from "firebase-functions"
import { UserRecord } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
const { initializeApp } = require("firebase-admin/app")

initializeApp()

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onCreateUser = auth.user().onCreate(async (user: UserRecord) => {
	console.log(`User Created with ${user.uid}`)
	const uid = user.uid
	const db = getFirestore()

	const userRes = await db.collection("users").add({
		uid,
	})

	await db.collection("users").doc(userRes.id).collection("tasks").add({
		taskName: "",
		taskDescription: "",
		taskStatus: "",
		dueDate: "",
	})
})
