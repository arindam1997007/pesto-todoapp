import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button/Button"

import styles from "./TaskPage.module.css"

export const TaskPage = () => {
	const navigate = useNavigate()

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
			<p>Hi, You don't have any tasks as of now!</p>
		</section>
	)
}
