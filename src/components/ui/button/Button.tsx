import classNames from "classnames"
import React from "react"

import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	variant?: "primary" | "secondary"
	className?: string
}

export const Button = ({
	children,
	variant = "primary",
	className,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={classNames(
				styles.button,
				{
					[styles.primary]: variant === "primary",
					[styles.secondary]: variant === "secondary",
				},
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
