import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6"
import { FiEdit } from "react-icons/fi"
import { TaskEntityProps } from "./TaskEntityProps"
import { Button } from "../ui/button/Button"

import styles from "./TaskEntity.module.css"

export const TaskEntity = ({ task }: TaskEntityProps) => {
	const { taskName, description } = task

	return (
		<article className={styles["task-entity"]}>
			<Button variant='secondary' className={styles["check-button"]}>
				<FaRegCircle />
			</Button>
			<span className={styles["task-name"]}>{taskName}</span>
			<Button variant='secondary' className={styles["edit-button"]}>
				<FiEdit />
			</Button>
			<span className={styles.description}>{description}</span>
		</article>
	)
}
