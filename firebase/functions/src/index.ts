/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { User } from "firebase/auth"
// import { auth } from "firebase-functions"
// import { UserRecord } from "firebase-admin/auth"
// const { initializeApp } = require("firebase-admin/app")

// initializeApp()

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const onCreateUser = auth.user().onCreate(async (user: UserRecord) => {
// 	console.log(`User Created with ${user.uid}`)
// const uid = user.uid

// const userRes = await db.collection("users").add({
// 	uid,
// })

// await db.collection("users").doc(userRes.id).collection("tasks").add({
// 	taskName: "",
// 	taskDescription: "",
// 	taskStatus: "",
// 	dueDate: "",
// })
// })
// import { logger } from "firebase-functions"
import * as admin from "firebase-admin"
import { onSchedule } from "firebase-functions/v2/scheduler"
import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

initializeApp()
const db = getFirestore()

exports.scheduleSendMail = onSchedule("0 14 * * *", async event => {
	try {
		const today = new Date()
		const tomorrow = new Date(today)
		tomorrow.setDate(today.getDate() + 1)

		// Format tomorrow's date to YYYY-MM-DD
		const tomorrowFormatted = tomorrow.toISOString().split("T")[0]
		console.log("Next Date", tomorrowFormatted)

		const querySnapshot = await db
			.collection("emails")
			.where("dueDate", "==", tomorrowFormatted)
			.where("isComplete", "==", false)
			.get()

		/* Iterating over all documents from emails collection, where dueDate is tomorrow, and isComplete is false.
        Then all the emailIds are stored in a Set, so as to avoid duplication of emails.
        For each emailIds, all taskNames are being stored in a Map. Then one email will be sent per user,
        with all taskNames present in the mail. */
		const emailIds = new Set()
		const taskNameMap = new Map()

		for (const doc of querySnapshot.docs) {
			const docData = doc.data()
			await getAuth()
				.getUser(docData.uid)
				.then(userRecord => {
					const email = userRecord.email as string
					emailIds.add(email)
					if (!taskNameMap.has(email)) {
						taskNameMap.set(email, [docData.taskName])
					} else taskNameMap.get(email).push(docData.taskName)
				})
				.catch(error => {
					console.log("Error fetching user data:", error)
				})
		}

		console.log("Email IDs found", emailIds)
		console.log("Tasks found", taskNameMap)

		/* Iterating over the set of email IDs found and sending
        reminder emails to each user. For each email ID, it retrieves the corresponding task names from
        the `taskNameMap`, joins them into a string, and then sends an email using the
        `admin.firestore().collection("mail").add()` method.
        Trigger Email from Firestore extension is used from Firebase for sending e-mails */
		emailIds.forEach(email => {
			const taskNameString = taskNameMap.get(email).join(", ")

			admin
				.firestore()
				.collection("mail")
				.add({
					to: email,
					message: {
						subject: "Reminder from ToDo App!",
						text: "Your task is due",
						html: `<p style="font-size: 16px;">Your task is due</p>
                    <p style="font-size: 16px;">Tasks are ${taskNameString} </p>
	            <p style="font-size: 16px;>Please check it at <a href='https://presto-tech-2cd37.web.app/'>To-Do app</a></p>
	            <p style="font-size: 16px;>Thank you</p>
	            <p style="font-size:10px;">This is an automated reminder e-mail!</p>
	        `,
					},
				})
				.then(() => console.log("Queued email for delivery!", email))
				.catch(err => console.error(err))
		})
	} catch (error) {
		console.error("Erorr in scheduleSendMail", error)
	}
})
