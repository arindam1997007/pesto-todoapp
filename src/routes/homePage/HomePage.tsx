import { Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { IoPersonCircleOutline } from "react-icons/io5"
import { Button } from "../../components/ui/button/Button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover/Popover"

import styles from "./HomePage.module.css"

export const HomePage = () => {
	const useAuth = useContext(AuthContext)
	const navigate = useNavigate()
	const profileName =
		useAuth?.currentUser?.displayName || useAuth?.currentUser?.email

	return (
		<main className={styles["homePage-main"]}>
			<header className={styles.header}>
				<h3
					onClick={() => {
						navigate("/tasks")
					}}
				>
					To-Do Application
				</h3>
				<nav className={styles.navbar}>
					{profileName && (
						<>
							<p>Hi! {profileName}</p>
							<Popover>
								<PopoverTrigger className={styles["popover--trigger"]}>
									<IoPersonCircleOutline />
								</PopoverTrigger>
								<PopoverContent>
									<Button variant='secondary' onClick={useAuth.logout}>
										Logout
									</Button>
								</PopoverContent>
							</Popover>
						</>
					)}
				</nav>
			</header>
			<Outlet />
		</main>
	)
}
