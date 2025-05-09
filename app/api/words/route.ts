import { NextResponse } from 'next/server'
import knex from '@/lib/db/connection'

export async function POST(request: Request) {
  try {
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
    const [wordId] = await knex('words').insert({
      word,
      description,
      examples: JSON.stringify(examples),
      user_id: 1, // TODO: Get from session
      created_at: new Date(),
    })

    // Add the initial brief vote
    await knex('brief_votes').insert({
      word_id: wordId,
      user_id: 1, // TODO: Get from session
      brief: initialBrief,
      theory: 'phoenix', // Default theory
      votes: 0,
      created_at: new Date(),
    })

    // Get the created word with its brief votes
    const createdWord = await knex('words').where('id', wordId).first()

    const briefVotes = await knex('brief_votes')
      .where('word_id', wordId)
      .select('*')

    return NextResponse.json(
      {
        ...createdWord,
        briefs: briefVotes,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding word:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}
