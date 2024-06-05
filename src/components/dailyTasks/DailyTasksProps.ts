import { SingleTaskType } from "../taskEntity/TaskEntityProps"

export interface DailyTaskInterface {
	date: string
	items: SingleTaskType[]
}

export interface DailyTasksProps {
	dailyTasks: DailyTaskInterface
}
