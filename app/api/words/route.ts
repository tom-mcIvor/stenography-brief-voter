import { NextResponse } from 'next/server'
import type { TheoryKey } from '@/components/theory-index'
import db from '@/lib/db/db'

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

    // Add the word to the database
    const [wordId] = await db.addWord({
      word,
      userId: 1, // TODO: Replace with actual user ID from authentication
    })

    // Add the initial brief vote
    await db.addBriefVote({
      wordId,
      userId: 1, // TODO: Replace with actual user ID from authentication
      brief: initialBrief,
      theory: theory as TheoryKey,
    })

    // Get the created word with its brief votes
    const createdWord = await db.getWordById(wordId)
    const briefVotes = await db.getBriefVotesByWordId(wordId)

    // Return the created word with its brief votes
    return NextResponse.json(
      {
        ...createdWord,
        description,
        examples,
        briefs: briefVotes.map((vote) => ({
          id: vote.id,
          brief: vote.brief,
          votes: 0, // TODO: Implement vote counting
          theory: vote.theory,
        })),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding word:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}
