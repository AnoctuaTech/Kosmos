import * as React from "react"
import { cn } from "../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "auth"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          variant === "default" &&
            "h-10 rounded border border-border bg-white px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
          variant === "auth" &&
            "h-12 border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] focus-visible:border-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
