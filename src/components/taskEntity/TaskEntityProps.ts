import { TASK_STATUS_TYPE } from "../../const/taskConst"

export interface TaskEntityProps {
	task: SingleTaskType
}

export interface SingleTaskType {
	id: string
	description: string
	dueDate: string
	statusId: TASK_STATUS_TYPE
	taskName: string
}
