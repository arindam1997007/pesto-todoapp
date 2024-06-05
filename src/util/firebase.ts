import { User, onAuthStateChanged } from "firebase/auth"
import { auth, firestoreDb } from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { OnSubmitProps } from "../components/taskForm/PropTypes"

export const getCurrentUser = async (): Promise<User | null> => {
	return new Promise(res => {
		onAuthStateChanged(auth, async (user: User | null) => {
			console.log({ user })
			res(user)
		})
	})
}

export const createTask = async ({
	status,
	taskName,
	description,
	dueDate,
}: OnSubmitProps) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")
	return await addDoc(collection(firestoreDb, "users", user.uid, "tasks"), {
		statusId: status.value,
		taskName,
		description,
		dueDate,
	})
}
