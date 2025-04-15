import type React from "react"
import { LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface PremiumFeatureProps {
  children: React.ReactNode
  premiumRequired?: boolean
  featureName: string
  tooltipText?: string
}

export function PremiumFeature({
  children,
  premiumRequired = true,
  featureName,
  tooltipText = "This is a premium feature",
}: PremiumFeatureProps) {
  // In a real app, you would check if the user has a premium subscription
  const hasPremium = false

  if (!premiumRequired || hasPremium) {
    return <>{children}</>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <div className="opacity-50 pointer-events-none">{children}</div>
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-2 p-4">
                <LockIcon className="h-6 w-6 text-primary" />
                <p className="text-sm font-medium">{featureName}</p>
                <Button size="sm" asChild>
                  <Link href="/pricing">Upgrade</Link>
                </Button>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
