import { toast } from "react-toastify"
import { OnSubmitProps } from "../../components/taskForm/PropTypes"
import { TaskForm } from "../../components/taskForm/TaskForm"
import { createTask } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { returnToastError } from "../../util/error"

import styles from "./CreateTaskPage.module.css"

export const CreateTaskPage = () => {
	const navigate = useNavigate()

	const onCancel = () => {
		navigate("/tasks")
	}

	const onSubmit = async ({
		status,
		taskName,
		description,
		dueDate,
	}: OnSubmitProps): Promise<void> => {
		return createTask({
			status,
			taskName,
			description,
			dueDate,
		})
			.then(() => {
				toast.success("Successfully added!")
			})
			.catch(error => {
				console.error(error)
				toast.error(returnToastError(error))
			})
	}

	return (
		<section className={styles["create-task--section"]}>
			<TaskForm onCancel={onCancel} onSubmit={onSubmit} />
		</section>
	)
}
