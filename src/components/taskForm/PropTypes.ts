import { TASK_STATUS, TASK_STATUS_TYPE } from "../../const/taskConst"

export interface TaskFormProps {
	onCancel: () => void
	showStatus?: boolean
	onSubmit: (args: OnSubmitProps) => void
}

export interface OnSubmitProps {
	status: (typeof TASK_STATUS)[0]
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
