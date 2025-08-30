"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface InteractiveButtonProps extends React.ComponentProps<typeof Button> {
  tooltip?: string
  shortcut?: string
  loading?: boolean
  success?: boolean
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ tooltip, shortcut, loading, success, children, className, disabled, ...props }, ref) => {
    const button = (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "transition-all duration-200 hover:scale-105 active:scale-95",
          success && "bg-green-600 hover:bg-green-700",
          loading && "cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
        {success && !loading && (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {children}
      </Button>
    )

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                <span>{tooltip}</span>
                {shortcut && (
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {shortcut}
                  </kbd>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  },
)

InteractiveButton.displayName = "InteractiveButton"
