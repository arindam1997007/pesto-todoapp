import { onAuthStateChanged, signOut, User } from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"

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

	const navigate = useNavigate()

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
		navigate("/")
	}

	const value = {
		currentUser,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
