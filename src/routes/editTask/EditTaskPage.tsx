import { toast } from "react-toastify"
import { OnSubmitProps } from "../../components/taskForm/PropTypes"
import { TaskForm } from "../../components/taskForm/TaskForm"
import { updateTask } from "../../util/firebase"
import { useLoaderData, useNavigate } from "react-router-dom"
import { returnToastError } from "../../util/error"
import { Button } from "../../components/ui/button/Button"
import { SingleTaskType } from "../../components/taskEntity/TaskEntityProps"

import styles from "./EditTaskPage.module.css"

export const EditTaskPage = () => {
	const navigate = useNavigate()
	const task = useLoaderData() as SingleTaskType

	const navigateToTasks = () => {
		navigate("/tasks")
	}

	const onSubmit = async ({
		statusId,
		taskName,
		description,
		dueDate,
	}: OnSubmitProps): Promise<void> => {
		return updateTask({
			statusId,
			taskName,
			description,
			dueDate,
			taskId: task.id,
		})
			.then(() => {
				toast.success("Successfully edited!")
				navigateToTasks()
			})
			.catch(error => {
				console.error(error)
				toast.error(returnToastError(error))
			})
	}

	return (
		<section className={styles["edit-task--section"]}>
			<Button className={styles["view-button"]} onClick={navigateToTasks}>
				View Tasks
			</Button>
			<TaskForm
				title={"Edit Task"}
				onCancel={navigateToTasks}
				onSubmit={onSubmit}
				task={task}
			/>
		</section>
	)
}
