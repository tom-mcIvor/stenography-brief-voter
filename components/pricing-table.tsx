"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface PricingFeature {
  name: string
  description?: string
  included: boolean | "limited"
}

interface PricingTier {
  name: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  features: PricingFeature[]
  buttonText: string
  popular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Basic features for stenography enthusiasts",
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      { name: "Vote on briefs", included: true },
      { name: "Suggest new briefs", included: true },
      { name: "Add new words", included: true },
      { name: "View theory information", included: true },
      { name: "Basic search", included: true },
      { name: "Export briefs", included: "limited", description: "Limited to 10 briefs per month" },
      { name: "Create practice drills", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Private collections", included: false },
      { name: "Priority voting", included: false },
      { name: "Custom theory creation", included: false },
      { name: "Ad-free experience", included: false },
    ],
    buttonText: "Current Plan",
  },
  {
    name: "Pro",
    description: "For serious stenographers and professionals",
    price: {
      monthly: 9.99,
      annually: 7.99,
    },
    features: [
      { name: "Vote on briefs", included: true },
      { name: "Suggest new briefs", included: true },
      { name: "Add new words", included: true },
      { name: "View theory information", included: true },
      { name: "Advanced search", included: true },
      { name: "Export briefs", included: true },
      { name: "Create practice drills", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Private collections", included: true },
      { name: "Priority voting", included: true, description: "Your votes count as 2x" },
      { name: "Custom theory creation", included: false },
      { name: "Ad-free experience", included: true },
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Expert",
    description: "For court reporters and stenography schools",
    price: {
      monthly: 19.99,
      annually: 16.99,
    },
    features: [
      { name: "Vote on briefs", included: true },
      { name: "Suggest new briefs", included: true },
      { name: "Add new words", included: true },
      { name: "View theory information", included: true },
      { name: "Advanced search", included: true },
      { name: "Export briefs", included: true },
      { name: "Create practice drills", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Private collections", included: true },
      { name: "Priority voting", included: true, description: "Your votes count as 3x" },
      { name: "Custom theory creation", included: true },
      { name: "Ad-free experience", included: true },
    ],
    buttonText: "Upgrade to Expert",
  },
]

export function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === "annually"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
          />
          <div className="flex items-center space-x-1">
            <Label htmlFor="billing-cycle">Annual</Label>
            <Badge variant="secondary" className="text-xs font-normal">
              Save 20%
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? "border-primary shadow-md relative" : ""}`}>
            {tier.popular && <Badge className="absolute -top-2 right-4">Most Popular</Badge>}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${tier.price[billingCycle]}</span>
                <span className="text-muted-foreground">
                  {" "}
                  / {billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      {feature.included === true ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : feature.included === "limited" ? (
                        <Check className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-muted-foreground/20" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className={feature.included === false ? "text-muted-foreground" : ""}>{feature.name}</span>
                      {feature.description && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{feature.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={tier.name === "Free" ? "outline" : "default"}
                className="w-full"
                disabled={tier.name === "Free"}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
