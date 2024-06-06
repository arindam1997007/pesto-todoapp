import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6"
import { RiDeleteBin4Fill } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import { TaskEntityProps } from "./TaskEntityProps"
import { Button } from "../ui/button/Button"
import { deleteTask, updateTask } from "../../util/firebase"
import {
	TASK_COMPLETED_STATUS,
	TASK_PENDING_STATUS,
	TASK_STATUS_TYPE,
} from "../../const/taskConst"
import { useState } from "react"
import { toast } from "react-toastify"
import classNames from "classnames"
import { returnToastError } from "../../util/error"
import { useNavigate } from "react-router-dom"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alertDialog/AlertDialog"

import styles from "./TaskEntity.module.css"

export const TaskEntity = ({ task, refetchTasks }: TaskEntityProps) => {
	const navigate = useNavigate()
	const { taskName, description } = task

	const [status, setStatus] = useState(task.statusId)

	const onToggleTask = async () => {
		let updatedStatus: TASK_STATUS_TYPE
		const originalStatus = status

		if (status === TASK_PENDING_STATUS) updatedStatus = TASK_COMPLETED_STATUS
		else updatedStatus = TASK_PENDING_STATUS
		setStatus(updatedStatus)

		const updatedTask = { ...task, taskId: task.id, statusId: updatedStatus }

		updateTask(updatedTask).catch(err => {
			setStatus(originalStatus)
			console.error(err)
			toast.error(returnToastError(err))
		})
	}

	const onEdit = () => {
		navigate(`/task/${task.id}`)
	}

	const onDeleteTask = async () => {
		deleteTask(task.id)
			.then(() => {
				refetchTasks()
				toast.success("Successfully deleted")
			})
			.catch(err => {
				console.error(err)
				toast.error(returnToastError(err))
			})
	}

	return (
		<article
			className={classNames([
				styles["task-entity"],
				{
					[styles["task-completed"]]: status === TASK_COMPLETED_STATUS,
				},
			])}
		>
			<Button
				variant='secondary'
				className={styles["check-button"]}
				onClick={onToggleTask}
			>
				{status === TASK_PENDING_STATUS ? (
					<FaRegCircle />
				) : (
					<FaRegCircleCheck />
				)}
			</Button>
			<span className={styles["task-name"]}>{taskName}</span>
			<Button variant='secondary' className={styles["edit-button"]}>
				<FiEdit onClick={onEdit} />
			</Button>
			<AlertDialog>
				<AlertDialogTrigger className={styles["delete-button"]}>
					<RiDeleteBin4Fill />
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className={styles["dialog--title"]}>
							This action cannot be undone
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onDeleteTask}>
							Yes, Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<span className={styles.description}>{description}</span>
		</article>
	)
}
