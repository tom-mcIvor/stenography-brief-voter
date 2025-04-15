import { NextResponse } from "next/server"
import type { TheoryKey } from "@/components/theory-index"

// This would be replaced with a database in a real application
let nextWordId = 6 // Starting after our sample data

export async function POST(request: Request) {
  try {
    const { word, description, examples, initialBrief, theory = "phoenix" } = await request.json()

    // Validate required fields
    if (!word || !description || !examples || !initialBrief) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save this to a database
    const newWord = {
      id: nextWordId++,
      word,
      description,
      examples,
      frequency: null, // Would be calculated or assigned in a real app
      briefs: [
        {
          id: 1, // Would be generated in a real app
          brief: initialBrief,
          votes: 0, // Start with 0 votes
          theory: theory as TheoryKey,
        },
      ],
    }

    // Return the created word
    return NextResponse.json(newWord, { status: 201 })
  } catch (error) {
    console.error("Error adding word:", error)
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 })
  }
}
