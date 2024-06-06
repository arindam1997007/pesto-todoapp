import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import styles from "./ErrorPage.module.css"

export const ErrorPage = () => {
	const error = useRouteError()

	let errorMessage: string
	let errorStatus

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText
		errorStatus = error.status
	} else if (error instanceof Error) {
		errorMessage = error.message
	} else if (typeof error === "string") {
		errorMessage = error
	} else {
		errorMessage = "Unknown error"
	}

	console.error(error)

	return (
		<div className={styles["error-page"]}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			{errorStatus && <p className={styles["error-status"]}>{errorStatus}</p>}
			<p className={styles["error-message"]}>
				<i>{errorMessage}</i>
			</p>
		</div>
	)
}
