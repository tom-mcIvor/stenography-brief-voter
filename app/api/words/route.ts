import { NextResponse } from 'next/server'
import type { TheoryKey } from '@/components/theory-index'
import knex from '@/lib/db/connection'

// This would be replaced with a database in a real application
let nextWordId = 6 // Starting after our sample data

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

    if (!knex) {
      throw new Error('Database connection not available')
    }

    // Start a transaction
    const trx = await knex.transaction()

    try {
      // Insert the word
      const [wordId] = await trx('words').insert({
        word,
        description,
        examples: JSON.stringify(examples),
        user_id: 1, // TODO: Get from session
        created_at: new Date().toISOString(),
      })

      // Insert the initial brief vote
      await trx('brief_votes').insert({
        word_id: wordId,
        user_id: 1, // TODO: Get from session
        brief: initialBrief,
        theory,
        created_at: new Date().toISOString(),
      })

      // Commit the transaction
      await trx.commit()

      // Fetch the complete word with its briefs
      const newWord = await knex('words').where('id', wordId).first()

      const briefs = await knex('brief_votes')
        .where('word_id', wordId)
        .select('*')

      // Return the created word with its briefs
      return NextResponse.json(
        {
          ...newWord,
          examples: JSON.parse(newWord.examples),
          briefs,
        },
        { status: 201 }
      )
    } catch (error) {
      // Rollback the transaction on error
      await trx.rollback()
      throw error
    }
  } catch (error) {
    console.error('Error adding word:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}
