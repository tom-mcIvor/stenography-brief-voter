"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function PricingError() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")

  useEffect(() => {
    if (!error) {
      router.push("/pricing")
    }
  }, [error, router])

  if (!error) return null

  const errorMessages: Record<string, string> = {
    checkout_failed: "There was an error processing your payment. Please try again.",
    session_expired: "Your checkout session has expired. Please try again.",
    payment_failed: "Your payment was declined. Please try again with a different payment method.",
  }

  const errorMessage = errorMessages[error] || "An unexpected error occurred. Please try again."

  return (
    <div className="container mx-auto py-6">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Payment Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <Button onClick={() => router.push("/pricing")}>Try Again</Button>
    </div>
  )
}
