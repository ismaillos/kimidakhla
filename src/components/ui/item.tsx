import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const itemVariants = cva(
  "flex items-center justify-between rounded-md border px-3 py-2 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(itemVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Item.displayName = "Item"

export { Item, itemVariants }
