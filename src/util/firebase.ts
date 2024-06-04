import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

export const getCurrentUser = async () => {
	return new Promise(res => {
		onAuthStateChanged(auth, async user => {
			res(user)
		})
	})
}
