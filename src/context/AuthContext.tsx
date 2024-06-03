import { onAuthStateChanged, signOut, User } from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

interface AuthContextType {
	currentUser: User | null
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(() => {
		const user = localStorage.getItem("currentUser")
		return user ? JSON.parse(user) : null
	})

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				localStorage.setItem("currentUser", JSON.stringify(user))
			} else {
				localStorage.removeItem("currentUser")
			}
			setCurrentUser(user)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	const logout = async () => {
		localStorage.clear()
		await signOut(auth)
	}

	const value = {
		currentUser,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
