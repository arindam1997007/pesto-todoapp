import { OnSubmitProps } from "../../components/taskForm/PropTypes"
import { TaskForm } from "../../components/taskForm/TaskForm"

import styles from "./CreateTaskPage.module.css"
import { useNavigate } from "react-router-dom"

export const CreateTaskPage = () => {
	const navigate = useNavigate()

	const onCancel = () => {
		navigate("/tasks")
	}

	const onSubmit = ({
		status,
		taskName,
		description,
		dueDate,
	}: OnSubmitProps) => {
		console.log({ status, taskName, description, dueDate })
	}

	return (
		<section className={styles["create-task--section"]}>
			<TaskForm onCancel={onCancel} onSubmit={onSubmit} />
		</section>
	)
}
