import { TaskEntity } from "../taskEntity/TaskEntity"
import { DailyTasksProps } from "./DailyTasksProps"
import classNames from "classnames"
import { formatDateForTaskList, hasDueDatePassed } from "../../util/date"

import styles from "./DailyTasks.module.css"

export const DailyTasks = ({ dailyTasks }: DailyTasksProps) => {
	const isDue = hasDueDatePassed(dailyTasks.date)

	return (
		<div className={styles["daily-tasks"]}>
			<span
				className={classNames([styles["due-date"]], {
					[styles.upcoming]: isDue >= 0,
					[styles.late]: isDue < 0,
				})}
			>
				{formatDateForTaskList(dailyTasks.date)}
			</span>
			{dailyTasks.items.map(task => {
				return <TaskEntity task={task} key={task.id} />
			})}
		</div>
	)
}
