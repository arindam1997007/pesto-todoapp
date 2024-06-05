import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import classNames from "classnames"

import styles from "./Popover.module.css"

const Popover = PopoverPrimitive.Root

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverTrigger: React.FC<
	React.ComponentProps<typeof PopoverPrimitive.Trigger> & { className?: string }
> = ({ className, ...props }) => (
	<PopoverPrimitive.Trigger
		className={classNames(className, styles["popover-trigger"])}
		{...props}
	/>
)

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={classNames([styles.popover], className)}
			{...props}
		/>
	</PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
