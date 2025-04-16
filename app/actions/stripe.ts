"use server"

import { redirect } from "next/navigation"
import stripe from "@/lib/stripe"

// Map of plan IDs to friendly names
const PLAN_NAMES = {
  small_coffee: "Small Coffee",
  large_coffee: "Large Coffee",
}

export async function createCheckoutSession(formData: FormData) {
  const plan = formData.get("plan") as string
  const amount = Number(formData.get("amount")) || 5 // Default to $5 if amount is not provided

  // Validate inputs
  if (!plan || !PLAN_NAMES[plan as keyof typeof PLAN_NAMES]) {
    console.error("Invalid plan:", plan)
    return redirect(`/pricing?error=invalid_plan`)
  }

  if (!amount || amount <= 0) {
    console.error("Invalid amount:", amount)
    return redirect(`/pricing?error=invalid_amount`)
  }

  // Check if Stripe is initialized
  if (!stripe) {
    console.error("Stripe client is not initialized")
    return redirect(`/pricing?error=stripe_not_initialized`)
  }

  try {
    console.log(`Creating checkout session for ${plan} with amount $${amount}`)

    // Validate NEXT_PUBLIC_URL is set
    if (!process.env.NEXT_PUBLIC_URL) {
      console.error("NEXT_PUBLIC_URL is not set")
      return redirect(`/pricing?error=missing_url_config`)
    }

    // Create a checkout session with Stripe for a one-time payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: PLAN_NAMES[plan as keyof typeof PLAN_NAMES] || "Support StenoBriefs",
              description: "Thank you for supporting the development of StenoBriefs!",
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment", // One-time payment instead of subscription
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      metadata: {
        plan,
        amount: amount.toString(),
      },
    })

    console.log("Checkout session created:", session.id)

    // Redirect to the Stripe checkout page
    if (session.url) {
      return redirect(session.url)
    } else {
      console.error("Session created but no URL returned")
      return redirect(`/pricing?error=no_checkout_url`)
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)

    // Provide more specific error information
    if (error instanceof Error) {
      console.error("Error message:", error.message)
    }

    return redirect(`/pricing?error=checkout_failed`)
  }
}
