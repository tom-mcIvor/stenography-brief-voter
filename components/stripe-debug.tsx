"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Bug, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export function StripeDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Map of error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    checkout_failed: "There was an error processing your payment. Please try again.",
    invalid_plan: "The selected plan is invalid.",
    invalid_amount: "The payment amount is invalid.",
    stripe_not_initialized: "The Stripe client failed to initialize. Please check your configuration.",
    missing_url_config: "The application URL configuration is missing.",
    no_checkout_url: "Stripe created a session but did not return a checkout URL.",
  }

  const errorMessage = error ? errorMessages[error] || "An unexpected error occurred." : null

  const testStripeConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe-test")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({ error: "Failed to test Stripe connection" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bug className="h-5 w-5 mr-2" />
              Stripe Connection Troubleshooting
            </div>
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
          <CardDescription>Use this tool to check if your Stripe integration is properly configured</CardDescription>
        </CardHeader>
        {isOpen && (
          <>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Environment Variables</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    STRIPE_SECRET_KEY: {process.env.STRIPE_SECRET_KEY ? "✅ Set" : "❌ Not set"}
                    {!process.env.STRIPE_SECRET_KEY && (
                      <p className="text-red-500 text-xs mt-1">
                        The Stripe secret key is missing. Add it to your environment variables.
                      </p>
                    )}
                  </li>
                  <li>
                    NEXT_PUBLIC_URL: {process.env.NEXT_PUBLIC_URL ? "✅ Set" : "❌ Not set"}
                    {!process.env.NEXT_PUBLIC_URL && (
                      <p className="text-red-500 text-xs mt-1">
                        The application URL is missing. Add it to your environment variables.
                      </p>
                    )}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Stripe Connection Test</h3>
                <Button onClick={testStripeConnection} disabled={isLoading} size="sm" variant="outline">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Stripe Connection"
                  )}
                </Button>

                {testResult && (
                  <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                    <pre className="whitespace-pre-wrap overflow-auto">{JSON.stringify(testResult, null, 2)}</pre>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Common Issues</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Invalid API Key:</strong> Make sure your Stripe API key is correct and has the right
                    permissions.
                  </li>
                  <li>
                    <strong>Test vs Live Mode:</strong> Ensure you're using the right mode (test or live) for your
                    environment.
                  </li>
                  <li>
                    <strong>Webhook Configuration:</strong> For production, set up webhooks to handle payment events.
                  </li>
                  <li>
                    <strong>CORS Issues:</strong> If you're getting CORS errors, check your Stripe dashboard settings.
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href = "/pricing?test=1"
                }}
              >
                Refresh Page
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
