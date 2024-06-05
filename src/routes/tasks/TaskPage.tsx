import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button/Button"
import { useEffect, useState } from "react"
import { getAllTasks } from "../../util/firebase"
import { organizeTasksByDate } from "../../util/tasks"
import { DailyTaskInterface } from "../../components/dailyTasks/DailyTasksProps"
import { DailyTasks } from "../../components/dailyTasks/DailyTasks"

import styles from "./TaskPage.module.css"

export const TaskPage = () => {
	const navigate = useNavigate()

	const [tasks, setTasks] = useState<DailyTaskInterface[]>([])

	useEffect(() => {
		async function retrieveTasks() {
			const allTasks = await getAllTasks()
			const organizedTasks = organizeTasksByDate(allTasks)
			setTasks(organizedTasks)
		}

		retrieveTasks()
	}, [])

	return (
		<section className={styles["task-section"]}>
			<Button
				className={styles["create-task"]}
				onClick={() => {
					navigate("/create-task")
				}}
			>
				Create Task
			</Button>
			{tasks.length === 0 ? (
				<p>
					Hi, You don't have any tasks as of now. <strong>Create one!</strong>
				</p>
			) : (
				tasks.map(dailyTasks => {
					return <DailyTasks dailyTasks={dailyTasks} key={dailyTasks.date} />
				})
			)}
		</section>
	)
}
