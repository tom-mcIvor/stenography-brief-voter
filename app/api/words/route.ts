import { NextResponse } from 'next/server'
import knex from '@/lib/db/connection'

export async function POST(request: Request) {
  try {
    if (!knex) {
      throw new Error('Database connection not available')
    }

    const body = await request.json()
    const { word, description, examples, initialBrief } = body

    // Validate required fields
    if (!word || !description || !examples || !initialBrief) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add the word
    const [wordId] = await knex
      .insert({
        word,
        description,
        examples: JSON.stringify(examples),
        user_id: 1, // TODO: Get from session
        created_at: new Date(),
      })
      .into('words')

    // Add the initial brief vote
    await knex
      .insert({
        word_id: wordId,
        user_id: 1, // TODO: Get from session
        brief: initialBrief,
        theory: 'phoenix', // Default theory
        votes: 0,
        created_at: new Date(),
      })
      .into('brief_votes')

    // Get the created word with its brief votes
    const createdWord = await knex
      .select('*')
      .from('words')
      .where('id', wordId)
      .first()

    const briefVotes = await knex
      .select('*')
      .from('brief_votes')
      .where('word_id', wordId)

    return NextResponse.json(
      {
        ...createdWord,
        briefs: briefVotes,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error adding word:', error)
    return NextResponse.json(
      {
        error: 'Failed to add word',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
