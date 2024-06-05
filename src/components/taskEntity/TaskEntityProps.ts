export interface TaskEntityProps {
	task: SingleTaskType
}

export interface SingleTaskType {
	id: string
	description: string
	dueDate: string
	statusId: string
	taskName: string
}
