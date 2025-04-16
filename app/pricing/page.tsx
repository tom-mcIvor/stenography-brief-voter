import { PricingTable } from "@/components/pricing-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, CreditCard, Lock, ShieldCheck } from "lucide-react"
import { StripeDebug } from "@/components/stripe-debug"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Support StenoBriefs</h1>
        <p className="text-xl text-muted-foreground">
          StenoBriefs is currently in development. Your support helps us build a better app!
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
        <div className="flex items-start gap-4">
          <Coffee className="h-10 w-10 text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-amber-800 mb-2">Buy Me a Coffee</h2>
            <p className="text-amber-700 mb-4">
              Instead of subscriptions, we're currently accepting donations to support the development of StenoBriefs.
              All features will remain free during the development phase.
            </p>
            <p className="text-amber-700 font-medium">
              Your support helps us cover hosting costs and dedicate more time to building the app!
            </p>
          </div>
        </div>
      </div>

      <PricingTable />

      <StripeDebug />

      <div className="max-w-3xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Secure Payments with Stripe
            </CardTitle>
            <CardDescription>We use Stripe for secure and reliable payment processing</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium mb-1">Secure Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and never stored on our servers
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <CreditCard className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium mb-1">Multiple Payment Methods</h3>
              <p className="text-sm text-muted-foreground">
                Pay with credit card, debit card, or other popular payment methods
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Coffee className="h-8 w-8 mb-2 text-amber-500" />
              <h3 className="font-medium mb-1">Support Development</h3>
              <p className="text-sm text-muted-foreground">
                100% of your donation goes directly to supporting the development of StenoBriefs
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Will there be premium features in the future?</h3>
              <p className="text-muted-foreground">
                Yes, we plan to introduce premium features once the app is more complete. However, all current features
                will remain free.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Will I get anything for my donation?</h3>
              <p className="text-muted-foreground">
                Besides our eternal gratitude, donors will be listed on our supporters page (if you wish) and will get
                early access to beta features as they're developed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">How can I contribute in other ways?</h3>
              <p className="text-muted-foreground">
                You can contribute by adding words and briefs to the database, reporting bugs, or suggesting features.
                Every contribution helps make StenoBriefs better!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
