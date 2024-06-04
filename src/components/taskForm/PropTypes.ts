import { TASK_STATUS } from "../../const/taskConst"

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
