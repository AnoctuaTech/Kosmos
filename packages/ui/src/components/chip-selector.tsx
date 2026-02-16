"use client"

import * as React from "react"
import { cn } from "../lib/utils"

interface ChipSelectorProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function ChipSelector({
  options,
  selected,
  onChange,
  className,
}: ChipSelectorProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors border",
              isSelected
                ? "bg-primary text-white border-primary"
                : "bg-white text-foreground-secondary border-border hover:border-foreground-muted"
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
