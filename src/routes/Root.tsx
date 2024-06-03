import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { IoPersonCircleOutline } from "react-icons/io5"
import { Button } from "../components/ui/button/Button"

import styles from "./Root.module.css"

export const Root = () => {
	const useAuth = useContext(AuthContext)
	const profileName =
		useAuth?.currentUser?.displayName || useAuth?.currentUser?.email

	return (
		<main className={styles["root-main"]}>
			<header className={styles.header}>
				<h3>To-Do Application</h3>
				<nav className={styles.navbar}>
					<p>Hi!</p>
					{profileName && (
						<>
							<p>{profileName}</p>
							<Button variant='secondary'>
								<IoPersonCircleOutline />
							</Button>
						</>
					)}
				</nav>
			</header>
			<Outlet />
		</main>
	)
}
