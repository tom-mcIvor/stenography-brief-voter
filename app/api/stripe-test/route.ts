import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"

export async function GET() {
  try {
    // Check if Stripe is initialized
    if (!stripe) {
      return NextResponse.json({ error: "Stripe client is not initialized" }, { status: 500 })
    }

    // Try to make a simple API call to Stripe
    const balance = await stripe.balance.retrieve()

    return NextResponse.json({
      success: true,
      message: "Stripe connection successful",
      stripeInitialized: !!stripe,
      balanceAvailable: !!balance,
      environment: {
        stripeKeySet: !!process.env.STRIPE_SECRET_KEY,
        appUrlSet: !!process.env.NEXT_PUBLIC_URL,
      },
    })
  } catch (error) {
    console.error("Error testing Stripe connection:", error)

    return NextResponse.json(
      {
        error: "Failed to connect to Stripe",
        message: error instanceof Error ? error.message : "Unknown error",
        stripeInitialized: !!stripe,
        environment: {
          stripeKeySet: !!process.env.STRIPE_SECRET_KEY,
          appUrlSet: !!process.env.NEXT_PUBLIC_URL,
        },
      },
      { status: 500 },
    )
  }
}
