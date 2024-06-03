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
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	const logout = async () => {
		await signOut(auth)
	}

	const value = {
		currentUser,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
