"use client"

import * as React from "react"
import { cn } from "../lib/utils"
import { X } from "lucide-react"

interface OptionCardProps {
  selected?: boolean
  onSelect?: () => void
  onDeselect?: () => void
  icon?: React.ReactNode
  title: string
  description: React.ReactNode
  className?: string
}

export function OptionCard({
  selected = false,
  onSelect,
  onDeselect,
  icon,
  title,
  description,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative rounded-xl border-2 p-6 text-left transition-all cursor-pointer",
        selected
          ? "border-primary bg-white"
          : "border-border bg-white hover:border-gray-300",
        className
      )}
    >
      {selected && onDeselect && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDeselect()
          }}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {icon && (
        <div
          className={cn(
            "mb-3.5 flex h-10 w-10 items-center justify-center rounded-lg",
            selected ? "bg-red-50 text-primary" : "bg-gray-100 text-foreground-secondary"
          )}
        >
          {icon}
        </div>
      )}

      <h3 className="text-[15px] font-semibold text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-foreground-secondary">
        {description}
      </p>
    </button>
  )
}
