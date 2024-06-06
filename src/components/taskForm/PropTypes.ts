import { TASK_STATUS_TYPE } from "../../const/taskConst"
import { SingleTaskType } from "../taskEntity/TaskEntityProps"

export interface TaskFormProps {
	title: string
	onCancel: () => void
	onSubmit: (args: OnSubmitProps) => void
	task?: SingleTaskType
}

export interface OnSubmitProps {
	statusId: TASK_STATUS_TYPE
	taskName: string
	description: string
	dueDate: string
}

export interface OnUpdateProps {
	statusId: TASK_STATUS_TYPE
	taskName: string
	description: string
	dueDate: string
	taskId: string
}
