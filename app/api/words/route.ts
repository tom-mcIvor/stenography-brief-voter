import { NextResponse } from 'next/server'
import type { TheoryKey } from '@/components/theory-index'
import db from '@/lib/db/db'

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

    // Add the word to the database
    const newWord = await db.addWord({
      word,
      description,
      examples,
      userId: 1, // TODO: Replace with actual user ID from authentication
    })

    // Add the initial brief vote
    await db.addBriefVote({
      wordId: newWord.id,
      userId: 1, // TODO: Replace with actual user ID from authentication
      brief: initialBrief,
      theory: theory as TheoryKey,
    })

    // Get the created word with its brief votes
    const createdWord = await db.getWordById(newWord.id)

    return NextResponse.json(createdWord, { status: 201 })
  } catch (error) {
    console.error('Error adding word:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const words = await db.getWords()
    return NextResponse.json(words)
  } catch (error) {
    console.error('Error fetching words:', error)
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Word ID is required' },
        { status: 400 }
      )
    }

    const updatedWord = await db.updateWord(id, updates)
    return NextResponse.json(updatedWord)
  } catch (error) {
    console.error('Error updating word:', error)
    return NextResponse.json(
      { error: 'Failed to update word' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Word ID is required' },
        { status: 400 }
      )
    }

    await db.deleteWord(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting word:', error)
    return NextResponse.json(
      { error: 'Failed to delete word' },
      { status: 500 }
    )
  }
}
