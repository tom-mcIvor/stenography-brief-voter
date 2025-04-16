"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useToast } from "@/hooks/use-toast"
import { Coffee, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface StripeCheckoutFormProps {
  plan: string
  price: number
  buttonText: string
}

export function StripeCheckoutForm({ plan, price, buttonText }: StripeCheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    try {
      // The form will be submitted to the server action
      // This is handled by the action prop on the form

      // If we get here, it means the form submission was intercepted by something else
      // or there was a client-side error
      toast({
        title: "Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    } catch (error) {
      console.error("Client-side error creating checkout session:", error)
      toast({
        title: "Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }

    // Add a timeout to reset the loading state if the redirect doesn't happen
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <form action={createCheckoutSession}>
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="amount" value={price.toString()} />
      <Button type="submit" className="w-full" disabled={isLoading} onClick={() => setIsLoading(true)}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Coffee className="mr-2 h-4 w-4" />
            {buttonText}
          </>
        )}
      </Button>
    </form>
  )
}
