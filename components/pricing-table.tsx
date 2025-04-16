"use client"
import { Check, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StripeCheckoutForm } from "./stripe-checkout-form"

interface PricingFeature {
  name: string
  description?: string
  included: boolean | "limited"
}

interface PricingTier {
  name: string
  description: string
  price: number
  features: string[]
  buttonText: string
  popular?: boolean
  planId?: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Basic features for stenography enthusiasts",
    price: 0,
    features: [
      "Vote on briefs",
      "Suggest new briefs",
      "Add new words",
      "View theory information",
      "Basic search",
      "Custom theory creation",
    ],
    buttonText: "Current Plan",
  },
  {
    name: "Small Coffee",
    description: "Support the development with a small coffee",
    price: 5,
    features: ["All free features", "Support ongoing development", "Your name in the supporters list", "Good karma"],
    buttonText: "Buy a Small Coffee",
    popular: true,
    planId: "small_coffee",
  },
  {
    name: "Large Coffee",
    description: "Support the development with a large coffee",
    price: 10,
    features: [
      "All free features",
      "Support ongoing development",
      "Your name in the supporters list",
      "Good karma",
      "Early access to beta features",
    ],
    buttonText: "Buy a Large Coffee",
    planId: "large_coffee",
  },
]

export function PricingTable() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? "border-primary shadow-md relative" : ""}`}>
            {tier.popular && <Badge className="absolute -top-2 right-4">Popular</Badge>}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {tier.name !== "Free" && <Coffee className="h-5 w-5 text-amber-500" />}
                {tier.name}
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {tier.planId ? (
                <StripeCheckoutForm plan={tier.planId} price={tier.price} buttonText={tier.buttonText} />
              ) : (
                <Button variant="outline" className="w-full" disabled={tier.name === "Free"}>
                  {tier.buttonText}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
