import { redirect } from "react-router-dom"
import { getCurrentUser } from "../../util/firebase"

export async function loginPageLoader() {
	const user = await getCurrentUser()
	if (user) return redirect(`/tasks`)
	return null
}
