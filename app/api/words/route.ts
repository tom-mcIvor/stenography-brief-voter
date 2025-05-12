import { NextResponse } from 'next/server'
import type { TheoryKey } from '@/components/theory-index'
import connection from '@/lib/db/connection'

export async function POST(request: Request) {
  try {
    const {
      word,
      description,
      examples,
      initialBrief,
      theory = 'phoenix',
    } = await request.json()

    // Validate required fields
    if (!word || !description || !examples || !initialBrief) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const [wordId] = await connection('words').insert({
      word,
      description,
      examples: JSON.stringify(examples),
      created_at: new Date().toISOString(),
    })

    // Add the initial brief
    const [briefId] = await connection('brief_votes').insert({
      word_id: wordId,
      brief: initialBrief,
      theory: theory as TheoryKey,
      votes: 0,
      created_at: new Date().toISOString(),
    })

    // Return the created word with its brief
    return NextResponse.json(
      {
        id: wordId,
        word,
        description,
        examples,
        frequency: null,
        briefs: [
          {
            id: briefId,
            brief: initialBrief,
            votes: 0,
            theory: theory as TheoryKey,
          },
        ],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding word:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}
