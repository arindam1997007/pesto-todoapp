export const TASK_ALL_STATUS = "all"
export const TASK_PENDING_STATUS = "pending"
export const TASK_COMPLETED_STATUS = "completed"

export const TASK_STATUS = [
	{
		label: "All",
		value: TASK_ALL_STATUS,
	},
	{
		label: "Pending",
		value: TASK_PENDING_STATUS,
	},
	{
		label: "Completed",
		value: TASK_COMPLETED_STATUS,
	},
] as const

export type TASK_STATUS_TYPE =
	| typeof TASK_ALL_STATUS
	| typeof TASK_PENDING_STATUS
	| typeof TASK_COMPLETED_STATUS
