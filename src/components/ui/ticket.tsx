
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ticketVariants = cva(
  "shadow-sm rounded-lg border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        ghost: "border-transparent bg-transparent",
        dark: "bg-card-dark border-border-dark text-foreground-dark",
        selected: "bg-card-selected border-border-selected"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TicketProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ticketVariants> {}

function Ticket({ className, variant, ...props }: TicketProps) {
  return (
    <div className={cn(ticketVariants({ variant }), className)} {...props} />
  )
}

export { Ticket, ticketVariants }
