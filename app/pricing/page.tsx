import { PricingTable } from "@/components/pricing-table"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="text-xl text-muted-foreground">Choose the perfect plan to enhance your stenography experience</p>
      </div>

      <PricingTable />

      <div className="max-w-3xl mx-auto mt-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Can I cancel my subscription at any time?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your premium features will remain active until the
                end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 7-day free trial for both Pro and Expert plans. No credit card required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">What happens to my data if I downgrade?</h3>
              <p className="text-muted-foreground">
                Your data will be preserved, but you'll lose access to premium features. If you have more than 10
                exported briefs, you won't be able to export more until you're under the limit.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Do you offer discounts for schools or teams?</h3>
              <p className="text-muted-foreground">
                Yes, we offer special pricing for educational institutions and teams of 5 or more. Please contact us for
                more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
