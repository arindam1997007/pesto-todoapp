import { TASK_STATUS_TYPE } from "../../const/taskConst"

export interface TaskEntityProps {
	task: SingleTaskType
	refetchTasks: () => void
}

export interface SingleTaskType {
	id: string
	description: string
	dueDate: string
	statusId: TASK_STATUS_TYPE
	taskName: string
}
