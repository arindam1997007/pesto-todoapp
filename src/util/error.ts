import { FirebaseError } from "firebase/app"

/**
 * This takes an error object as input and returns a formatted error
 * message based on the type of error.
 */
export const returnToastError = (err: unknown) => {
	if (err instanceof FirebaseError) return `${err.name} : ${err.code}`
	else if (err instanceof Error) return err.name
	else return "Error occurred"
}
