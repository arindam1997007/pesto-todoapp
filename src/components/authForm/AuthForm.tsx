import React, { useContext, useState } from "react"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../../firebase"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import { Button } from "../ui/button/Button"

import styles from "./AuthForm.module.css"

export const AuthForm = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [pending, setPending] = useState(false)
	const [showLogin, setShowLogin] = useState(true)

	const useAuth = useContext(AuthContext)
	console.log(useAuth?.currentUser)

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault()
		setPending(true)

		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				console.log({ user })
			})
			.catch(error => {
				toast.error(error.message)
			})
			.finally(() => {
				setPending(false)
			})
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setPending(true)
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				console.log({ user })
			})
			.catch(error => {
				toast.error(error.message)
			})
			.finally(() => {
				setPending(false)
			})
	}

	return (
		<form
			className={styles["auth-form"]}
			onSubmit={showLogin ? handleLogin : handleSignup}
		>
			<h4>Take Control of Your Day - Start Your ToDo List Here!</h4>
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
				aria-label='email'
				required
			/>
			<input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Password'
				aria-label='password'
				required
			/>
			<Button disabled={pending}>
				{pending ? "Submitting..." : showLogin ? "Log In" : "Sign Up"}
			</Button>

			<p className={styles["switch-method"]}>
				{showLogin ? (
					<>
						Don't have an account?{" "}
						<Button variant='secondary' onClick={() => setShowLogin(false)}>
							Register Now
						</Button>
					</>
				) : (
					<>
						Already an user?
						<Button variant='secondary' onClick={() => setShowLogin(true)}>
							Login here
						</Button>
					</>
				)}
			</p>
		</form>
	)
}
