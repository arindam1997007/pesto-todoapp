import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { getCurrentUser } from "../../util/firebase"

export async function protectedPageLoader({ request }: LoaderFunctionArgs) {
	const user = await getCurrentUser()
	const pathName = new URL(request.url).pathname
	if (!user && pathName !== "/") return redirect("/")
	return null
}
