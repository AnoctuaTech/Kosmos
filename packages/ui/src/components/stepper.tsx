import * as React from "react"
import { cn } from "../lib/utils"

interface Step {
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted && "bg-primary text-white",
                  isActive && "bg-primary text-white",
                  !isCompleted && !isActive && "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2 7 5.5 10.5 12 3.5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-foreground-muted"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 mb-6 h-0.5 w-12",
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
