import * as React from "react"
import { cn } from "../lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: { value: string; positive: boolean }
  className?: string
}

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: KPICardProps) {
  return (
    <div
      className={cn("rounded border border-border bg-white p-5", className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-foreground-muted">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-foreground-muted mt-1">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-2",
                trend.positive ? "text-success" : "text-error"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
