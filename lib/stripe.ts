import Stripe from "stripe"

// Check if the STRIPE_SECRET_KEY is set
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set. Please add it to your environment variables.")
}

// Initialize Stripe with error handling
let stripe: Stripe | null = null
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16", // Use the latest API version
  })
} catch (error) {
  console.error("Failed to initialize Stripe client:", error)
}

export default stripe
