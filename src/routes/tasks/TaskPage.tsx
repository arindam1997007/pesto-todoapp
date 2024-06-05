import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button/Button"
import { useCallback, useEffect, useState } from "react"
import { getFilteredTasks } from "../../util/firebase"
import { organizeTasksByDate } from "../../util/tasks"
import { DailyTaskInterface } from "../../components/dailyTasks/DailyTasksProps"
import { DailyTasks } from "../../components/dailyTasks/DailyTasks"
import { CiFilter } from "react-icons/ci"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover/Popover"

import styles from "./TaskPage.module.css"
import { Loader } from "../../components/ui/loader/Loader"
import {
	TASK_ALL_STATUS,
	TASK_COMPLETED_STATUS,
	TASK_STATUS,
	TASK_STATUS_TYPE,
} from "../../const/taskConst"
import { FilterTasks } from "../../components/filterTasks/FilterTasks"

export const TaskPage = () => {
	const navigate = useNavigate()

	const [tasks, setTasks] = useState<DailyTaskInterface[]>([])
	const [loading, setLoading] = useState(true)
	const [filterTask, setFilterTask] = useState(TASK_STATUS[0])

	const retrieveTasks = useCallback(async () => {
		setLoading(true)
		const allTasks = await getFilteredTasks(
			filterTask.value as TASK_STATUS_TYPE
		)
		const organizedTasks = organizeTasksByDate(allTasks)
		setTasks(organizedTasks)
		setLoading(false)
	}, [filterTask.value])

	useEffect(() => {
		retrieveTasks()
	}, [retrieveTasks])

	const onFilterChange = (value: string) => {
		setFilterTask(
			TASK_STATUS.find(task => task.value === value) || TASK_STATUS[0]
		)
	}

	const renderEmptyTaskPara = () => {
		if (filterTask.value === TASK_ALL_STATUS)
			return (
				<p>
					Hi, You don't have any tasks as of now. <strong>Create one!</strong>
				</p>
			)
		return (
			<p>
				{`Hi, You don't have any ${filterTask.value} tasks as of now. `}
				{filterTask.value !== TASK_COMPLETED_STATUS && (
					<strong>Create one!</strong>
				)}
			</p>
		)
	}

	return (
		<section className={styles["task-section"]}>
			<div className={styles["button-div"]}>
				<Popover>
					<PopoverTrigger className={styles["filter-button"]}>
						<CiFilter />
					</PopoverTrigger>
					<PopoverContent>
						<FilterTasks
							selectedFilter={filterTask}
							onChangeFilter={onFilterChange}
						/>
					</PopoverContent>
				</Popover>
				<Button
					onClick={() => {
						navigate("/create-task")
					}}
				>
					Create Task
				</Button>
			</div>
			{loading ? (
				<Loader />
			) : tasks.length === 0 ? (
				renderEmptyTaskPara()
			) : (
				tasks.map(dailyTasks => {
					return <DailyTasks dailyTasks={dailyTasks} key={dailyTasks.date} />
				})
			)}
		</section>
	)
}
