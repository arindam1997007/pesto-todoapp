import { LoaderFunctionArgs } from "react-router-dom"
import { getSingleTaskDetails } from "../../util/firebase"

export async function editTaskPageLoader({ params }: LoaderFunctionArgs) {
	const { taskId } = params
	const res = await getSingleTaskDetails(taskId || "")
	if (!res) throw new Error("No Task found for current user")
	return res
}
