import { redirect } from "react-router-dom"
import { getCurrentUser } from "../../util/firebase"

export async function taskPageLoader() {
	const user = await getCurrentUser()
	if (!user) return redirect(`/`)
	return null
}
