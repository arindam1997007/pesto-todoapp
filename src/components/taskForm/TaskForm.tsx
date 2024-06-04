import React, { useState } from "react"
import { TASK_STATUS } from "../../const/taskConst"
import { formatDateForInput, getTodayDate } from "../../util/date"
import { Button } from "../ui/button/Button"
import { TaskFormProps } from "./PropTypes"

import styles from "./TaskForm.module.css"

export const TaskForm = ({ onCancel, onSubmit, showStatus }: TaskFormProps) => {
	const [status, setStatus] = useState(TASK_STATUS[0])
	const [taskName, setTaskName] = useState("")
	const [description, setDescription] = useState("")
	const [dueDate, setDueDate] = useState<string>(getTodayDate())

	const onStatusChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget
		setStatus(TASK_STATUS.find(task => task.value === value) || TASK_STATUS[0])
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({ status, taskName, description, dueDate })
	}

	return (
		<div className={styles["new-task-div"]}>
			<h3>Create a New Task</h3>
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
							min={formatDateForInput(new Date())}
							value={dueDate}
							onChange={e => setDueDate(e.currentTarget.value)}
						/>
					</label>
					{showStatus && (
						<label className={styles["task-label"]}>
							Status
							<select
								name='status'
								value={status.value}
								onChange={onStatusChange}
								style={{
									color: status.color,
								}}
							>
								{TASK_STATUS.map(status => {
									return (
										<option value={status.value} key={status.value}>
											<span className={styles["circle"]} />
											{status.label}
										</option>
									)
								})}
							</select>
						</label>
					)}
				</div>
				<div className={styles["task-footer"]}>
					<Button variant='secondary' onClick={onCancel}>
						Cancel
					</Button>
					<Button>Submit</Button>
				</div>
			</form>
		</div>
	)
}
