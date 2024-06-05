import { User, onAuthStateChanged } from "firebase/auth"
import { auth, firestoreDb } from "../firebaseConfig"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { OnSubmitProps } from "../components/taskForm/PropTypes"
import { SingleTaskType } from "../components/taskEntity/TaskEntityProps"
import { capitalizeFirstLetter } from "./string"

export const getCurrentUser = async (): Promise<User | null> => {
	return new Promise(res => {
		onAuthStateChanged(auth, async (user: User | null) => {
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
		taskName: capitalizeFirstLetter(taskName),
		description: capitalizeFirstLetter(description),
		dueDate,
	})
}

export const getAllTasks = async () => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")
	const querySnapshot = await getDocs(
		collection(firestoreDb, "users", user.uid, "tasks")
	)

	const tasks: SingleTaskType[] = []

	if (querySnapshot.empty) return tasks

	querySnapshot.forEach(doc => {
		tasks.push({ id: doc.id, ...doc.data() } as SingleTaskType)
	})

	return tasks
}
