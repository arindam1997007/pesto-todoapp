import { User, onAuthStateChanged } from "firebase/auth"
import { auth, firestoreDb } from "../firebaseConfig"
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore"
import { OnSubmitProps, OnUpdateProps } from "../components/taskForm/PropTypes"
import { SingleTaskType } from "../components/taskEntity/TaskEntityProps"
import { capitalizeFirstLetter } from "./string"
import { TASK_STATUS_TYPE } from "../const/taskConst"

/**
 * This function asynchronously retrieves the current user information.
 */
export const getCurrentUser = async (): Promise<User | null> => {
	return new Promise(res => {
		onAuthStateChanged(auth, async (user: User | null) => {
			res(user)
		})
	})
}

/**
 * Creates a new task document in Firestore for the current user.
 * Document's path in Firestore DB is /users/userId/tasks/
 * If userId is not there in the users collection, it would automatically be created by Firebase
 */
export const createTask = async ({
	statusId,
	taskName,
	description,
	dueDate,
}: OnSubmitProps) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	return await addDoc(collection(firestoreDb, "users", user.uid, "tasks"), {
		statusId,
		taskName: capitalizeFirstLetter(taskName),
		description: capitalizeFirstLetter(description),
		dueDate,
	})
}

/**
 * Retrieves filtered tasks queried with statusId of each tasks.
 * If `statusId` is set to "all", it retrieves all tasks.
 */
export const getFilteredTasks = async (statusId: TASK_STATUS_TYPE) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	let querySnapshot
	const collectionRef = collection(firestoreDb, "users", user.uid, "tasks")

	if (statusId === "all") {
		querySnapshot = await getDocs(collectionRef)
	} else {
		const q = query(collectionRef, where("statusId", "==", statusId))
		querySnapshot = await getDocs(q)
	}

	const tasks: SingleTaskType[] = []

	if (querySnapshot.empty) return tasks

	querySnapshot.forEach(doc => {
		tasks.push({ id: doc.id, ...doc.data() } as SingleTaskType)
	})

	return tasks
}

/**
 * Updates a task in a Firestore database based on taskId.
 * The `taskName` and `description` are also being capitalized before updating.
 */
export const updateTask = async ({
	statusId,
	taskName,
	description,
	dueDate,
	taskId,
}: OnUpdateProps) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	return await updateDoc(doc(firestoreDb, "users", user.uid, "tasks", taskId), {
		statusId: statusId,
		taskName: capitalizeFirstLetter(taskName),
		description: capitalizeFirstLetter(description),
		dueDate,
	})
}

/**
 * Retrieves details of a single task based on the task ID after ensuring the
 * user is logged in.
 */
export const getSingleTaskDetails = async (
	taskId: string
): Promise<SingleTaskType | null> => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	const docRef = doc(firestoreDb, "users", user.uid, "tasks", taskId)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const task = { ...docSnap.data(), id: taskId } as SingleTaskType
		return task
	} else {
		return null
	}
}

/**
 * Deletes a task associated with a specific taskId after checking if the
 * user is logged in.
 */
export const deleteTask = async (taskId: string) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	return await deleteDoc(doc(firestoreDb, "users", user.uid, "tasks", taskId))
}

export const addTaskForReminder = async ({
	taskId,
	dueDate,
	isComplete,
	taskName,
}: {
	taskId: string
	dueDate: string
	isComplete: boolean
	taskName: string
}) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("User is not logged in!")

	return await setDoc(doc(firestoreDb, "emails", taskId), {
		isComplete,
		uid: user.uid,
		dueDate,
		taskName,
	})
}
