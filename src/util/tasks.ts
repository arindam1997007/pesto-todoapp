import { groupBy, orderBy } from "lodash"
import { SingleTaskType } from "../components/taskEntity/TaskEntityProps"
import { parseISO } from "date-fns"

export const organizeTasksByDate = (tasks: SingleTaskType[]) => {
	const groupedByDate = groupBy(tasks, "dueDate")

	const result = orderBy(
		Object.entries(groupedByDate).map(([date, items]) => ({ date, items })),
		item => parseISO(item.date),
		["asc"]
	)
	return result
}
