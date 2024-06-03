import styles from "./Root.module.css"

export const Root = () => {
	return (
		<main>
			<header className={styles.header}>
				<h3>ToDO App</h3>
				<nav>
					<p>Hi!</p>
				</nav>
			</header>
		</main>
	)
}
