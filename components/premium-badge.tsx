import { SparklesIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PremiumBadgeProps {
  plan?: "pro" | "expert"
  className?: string
}

export function PremiumBadge({ plan = "pro", className }: PremiumBadgeProps) {
  const isPro = plan === "pro"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`bg-gradient-to-r ${
              isPro
                ? "from-amber-200 to-yellow-400 text-amber-900 border-amber-400"
                : "from-purple-400 to-indigo-500 text-white border-indigo-400"
            } ${className}`}
          >
            <SparklesIcon className="h-3 w-3 mr-1" />
            {isPro ? "Pro" : "Expert"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPro ? "Pro" : "Expert"} subscription active</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
