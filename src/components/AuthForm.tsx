import React, { useContext, useState } from "react"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from "../context/AuthContext"

export const AuthForm = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const useAuth = useContext(AuthContext)
	console.log(useAuth?.currentUser)
	const handleSignup = async (e: React.MouseEvent) => {
		e.preventDefault()
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				console.log({ user })
			})
			.catch(error => {
				console.error(`Error with errorCode ${error.code} : ${error.message}`)
			})
	}

	const handleLogin = async (e: React.MouseEvent) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user
				console.log({ user })
			})
			.catch(error => {
				console.error(`Error with errorCode ${error.code} : ${error.message}`)
			})
	}

	return (
		<form>
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
			/>
			<input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button onClick={handleSignup}>Sign Up</button>
			<button onClick={handleLogin}>Log In</button>
		</form>
	)
}
