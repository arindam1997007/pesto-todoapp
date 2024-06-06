import { toast } from "react-toastify"
import { OnSubmitProps } from "../../components/taskForm/PropTypes"
import { TaskForm } from "../../components/taskForm/TaskForm"
import { createTask } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { returnToastError } from "../../util/error"
import { Button } from "../../components/ui/button/Button"

import styles from "./CreateTaskPage.module.css"

export const CreateTaskPage = () => {
	const navigate = useNavigate()

	const navigateToTasks = () => {
		navigate("/tasks")
	}

	const onSubmit = async ({
		statusId,
		taskName,
		description,
		dueDate,
	}: OnSubmitProps): Promise<void> => {
		return createTask({
			statusId,
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
			<Button className={styles["view-button"]} onClick={navigateToTasks}>
				View Tasks
			</Button>
			<TaskForm
				title='Create a New Task'
				onCancel={navigateToTasks}
				onSubmit={onSubmit}
			/>
		</section>
	)
}
