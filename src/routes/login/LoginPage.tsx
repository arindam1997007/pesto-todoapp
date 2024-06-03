import { AuthForm } from "../../components/authForm/AuthForm"

import styles from "./LoginPage.module.css"

export const LoginPage = () => {
	return (
		<section className={styles["login-section"]}>
			<AuthForm />
		</section>
	)
}
