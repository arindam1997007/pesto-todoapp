import { TASK_STATUS } from "../../const/taskConst"

import styles from "./FilterTasks.module.css"

interface FilterTasksProp {
	selectedFilter: (typeof TASK_STATUS)[number]
	onChangeFilter: (arg: string) => void
}

export const FilterTasks = ({
	selectedFilter,
	onChangeFilter,
}: FilterTasksProp) => {
	return (
		<div className={styles["filter-tasks"]}>
			{TASK_STATUS.map(item => (
				<label key={item.value}>
					<input
						type='radio'
						value={item.value}
						checked={selectedFilter.value === item.value}
						onChange={() => onChangeFilter(item.value)}
					/>
					{item.label}
				</label>
			))}
		</div>
	)
}
