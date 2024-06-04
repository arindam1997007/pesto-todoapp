import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { IoPersonCircleOutline } from "react-icons/io5"
import { Button } from "../../components/ui/button/Button"

import styles from "./HomePage.module.css"

export const HomePage = () => {
	const useAuth = useContext(AuthContext)
	const profileName =
		useAuth?.currentUser?.displayName || useAuth?.currentUser?.email

	return (
		<main className={styles["homePage-main"]}>
			<header className={styles.header}>
				<h3>To-Do Application</h3>
				<nav className={styles.navbar}>
					{profileName && (
						<>
							<p>Hi! {profileName}</p>
							<Button variant='secondary' onClick={useAuth.logout}>
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
