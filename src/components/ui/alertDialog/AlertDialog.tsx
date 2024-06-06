import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import classNames from "classnames"

import styles from "./AlertDialog.module.css"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={classNames([styles["alert-dialog--overlay"]], className)}
		{...props}
		ref={ref}
	/>
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			ref={ref}
			className={classNames([styles["alert-dialog--content"]], className)}
			{...props}
		/>
	</AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={className} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={classNames([styles["alert-dialog--footer"]], className)}
		{...props}
	/>
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={classNames([styles["alert-dialog--title"]], className)}
		{...props}
	/>
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={className}
		{...props}
	/>
))
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName

const AlertDialogTrigger = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Trigger
		ref={ref}
		className={classNames([styles["alert-dialog--trigger"], className])}
		{...props}
	/>
))
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Action
		ref={ref}
		className={styles["alert-dialog--action"]}
		{...props}
	/>
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel
		ref={ref}
		className={styles["alert-dialog--cancel"]}
		{...props}
	/>
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
}
