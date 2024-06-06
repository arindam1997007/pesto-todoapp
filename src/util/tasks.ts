import { groupBy, orderBy } from "lodash"
import { SingleTaskType } from "../components/taskEntity/TaskEntityProps"
import { parseISO } from "date-fns"

/**
 * This organizes an array of tasks by their due dates and returns them
 * in ascending order.
 * @returns Returns an array of objects, where each object
 * represents a date and its corresponding tasks grouped by that date. The tasks are sorted in
 * ascending order based on their due dates.
 */
export const organizeTasksByDate = (tasks: SingleTaskType[]) => {
	const groupedByDate = groupBy(tasks, "dueDate")

	const result = orderBy(
		Object.entries(groupedByDate).map(([date, items]) => ({ date, items })),
		item => parseISO(item.date),
		["asc"]
	)
	return result
}
