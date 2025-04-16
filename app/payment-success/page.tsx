"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Coffee, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentDetails {
  plan: string
  amount: number
  date: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(!!sessionId)
  const [payment, setPayment] = useState<PaymentDetails | null>(null)

  // Fallback values for testing
  const fallbackPlan = searchParams.get("plan") || "small_coffee"
  const fallbackAmount = Number(searchParams.get("amount")) || 5

  useEffect(() => {
    if (sessionId) {
      // In a real app, you would fetch the session details from your server
      // which would use Stripe's API to get the payment details

      // Simulate API call
      setTimeout(() => {
        setPayment({
          plan: fallbackPlan === "small_coffee" ? "Small Coffee" : "Large Coffee",
          amount: fallbackAmount,
          date: new Date().toLocaleDateString(),
        })
        setLoading(false)
      }, 1500)
    } else {
      // For testing without a session ID
      setPayment({
        plan: fallbackPlan === "small_coffee" ? "Small Coffee" : "Large Coffee",
        amount: fallbackAmount,
        date: new Date().toLocaleDateString(),
      })
    }
  }, [sessionId, fallbackPlan, fallbackAmount])

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Confirming your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>Your support is greatly appreciated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t border-b py-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Donation:</span>
              <span className="flex items-center">
                <Coffee className="h-4 w-4 mr-1 text-amber-500" />
                {payment?.plan}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>${payment?.amount}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{payment?.date}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Thank you for supporting the development of StenoBriefs! Your contribution helps us continue building and
            improving the app.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
