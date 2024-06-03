import { Outlet } from "react-router-dom"
import styles from "./Root.module.css"

export const Root = () => {
	return (
		<main className={styles["root-main"]}>
			<header className={styles.header}>
				<h3>To-Do Application</h3>
				<nav>
					<p>Hi!</p>
				</nav>
			</header>
			<Outlet />
		</main>
	)
}
