import * as React from "react"
import { cn } from "../../lib/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "muted" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300",
        {
          "border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-100/80 dark:bg-indigo-900/40 dark:text-indigo-300": variant === "default",
          "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-400": variant === "muted",
          "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
