import React, { useState } from "react"
import { TASK_PENDING_STATUS } from "../../const/taskConst"
import { formatDateForInput, getTodayDate } from "../../util/date"
import { Button } from "../ui/button/Button"
import { TaskFormProps } from "./PropTypes"

import styles from "./TaskForm.module.css"

export const TaskForm = ({
	onCancel,
	onSubmit,
	title,
	task,
}: TaskFormProps) => {
	const [taskName, setTaskName] = useState(task?.taskName || "")
	const [description, setDescription] = useState(task?.description || "")
	const [dueDate, setDueDate] = useState<string>(
		task?.dueDate || getTodayDate()
	)
	const [pending, setPending] = useState(false)

	const resetData = () => {
		setTaskName("")
		setDescription("")
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setPending(true)
		await onSubmit({
			statusId: TASK_PENDING_STATUS,
			taskName,
			description,
			dueDate,
		})
		setPending(false)
		resetData()
	}

	return (
		<div className={styles["new-task-div"]}>
			<h3>{title}</h3>
			<form className={styles["new-task-form"]} onSubmit={handleSubmit}>
				<input
					type='text'
					name='task'
					aria-label='Task Name'
					placeholder='Add a new task'
					required
					value={taskName}
					onChange={e => setTaskName(e.currentTarget.value)}
				/>
				<textarea
					name='description'
					aria-label='Description'
					placeholder='Add description'
					required
					value={description}
					onChange={e => setDescription(e.currentTarget.value)}
				/>
				<div className={styles["task-row"]}>
					<label className={styles["task-label"]}>
						Due Date
						<input
							aria-label='Due Date'
							type='date'
							required
							min={formatDateForInput(task?.dueDate || new Date())}
							value={dueDate}
							onChange={e => setDueDate(e.currentTarget.value)}
						/>
					</label>
				</div>
				<div className={styles["task-footer"]}>
					<Button variant='secondary' onClick={onCancel} disabled={pending}>
						Cancel
					</Button>
					<Button disabled={pending}>
						{pending ? "Submiting..." : "Submit"}
					</Button>
				</div>
			</form>
		</div>
	)
}
