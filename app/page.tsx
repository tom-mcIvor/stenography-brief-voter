'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import WordList from '@/components/word-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddWordButton } from '@/components/add-word-button'
import { TheoryIndex } from '@/components/theory-index'
import { UserAccountNav } from '@/components/user-account-nav'
import { type TheoryKey } from '@/components/theory-index'
import { useToast } from '@/hooks/use-toast'

// Sample data - in a real app, this would come from a database
const sampleWords = [
  {
    id: 1,
    word: 'the',
    briefs: [
      {
        id: 1,
        brief: 'T',
        votes: 0,
        isUserVoted: false,
        theory: 'phoenix' as TheoryKey,
      },
      {
        id: 2,
        brief: 'THE',
        votes: 0,
        isUserVoted: false,
        theory: 'stened' as TheoryKey,
      },
      {
        id: 3,
        brief: '-T',
        votes: 0,
        isUserVoted: false,
        theory: 'plover' as TheoryKey,
      },
    ],
    frequency: 1,
  },
  {
    id: 2,
    word: 'be',
    briefs: [
      {
        id: 4,
        brief: 'B',
        votes: 0,
        isUserVoted: false,
        theory: 'phoenix' as TheoryKey,
      },
      {
        id: 5,
        brief: 'BE',
        votes: 0,
        isUserVoted: false,
        theory: 'magnum' as TheoryKey,
      },
    ],
    frequency: 2,
  },
  {
    id: 3,
    word: 'to',
    briefs: [
      {
        id: 6,
        brief: 'TO',
        votes: 0,
        isUserVoted: false,
        theory: 'stened' as TheoryKey,
      },
      {
        id: 7,
        brief: 'TO',
        votes: 0,
        isUserVoted: false,
        theory: 'plover' as TheoryKey,
      },
    ],
    frequency: 3,
  },
  {
    id: 4,
    word: 'of',
    briefs: [
      {
        id: 8,
        brief: 'OF',
        votes: 0,
        isUserVoted: false,
        theory: 'other' as TheoryKey,
      },
      {
        id: 9,
        brief: '-F',
        votes: 0,
        isUserVoted: false,
        theory: 'lapwing' as TheoryKey,
      },
    ],
    frequency: 4,
  },
  {
    id: 5,
    word: 'and',
    briefs: [
      {
        id: 10,
        brief: 'SKP',
        votes: 0,
        isUserVoted: false,
        theory: 'phoenix' as TheoryKey,
      },
      {
        id: 11,
        brief: 'APBD',
        votes: 0,
        isUserVoted: false,
        theory: 'stened' as TheoryKey,
      },
      {
        id: 12,
        brief: 'APD',
        votes: 0,
        isUserVoted: false,
        theory: 'other' as TheoryKey,
      },
    ],
    frequency: 5,
  },
]

export default function Home() {
  const { toast } = useToast()
  const [words, setWords] = useState(sampleWords)

  // Generate a unique ID for new words
  const getNextWordId = () => {
    return Math.max(...words.map((word) => word.id)) + 1
  }

  // Generate a unique ID for new briefs
  const getNextBriefId = () => {
    const allBriefIds = words.flatMap((word) =>
      word.briefs.map((brief) => brief.id)
    )
    return Math.max(...allBriefIds) + 1
  }

  const handleAddWord = async (
    word: string,
    description: string,
    examples: string[],
    initialBrief: string
  ) => {
    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          description,
          examples,
          initialBrief,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add word')
      }

      const newWord = await response.json()
      setWords([newWord, ...words])
      toast({
        title: 'Success',
        description: 'Word added successfully',
      })
      return true
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to add word',
        variant: 'destructive',
      })
      return false
    }
  }

  const handleVote = async (wordId: number, briefId: number) => {
    try {
      const response = await fetch(
        `/api/words/${wordId}/briefs/${briefId}/vote`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to vote')
      }

      const updatedWord = await response.json()
      setWords(words.map((word) => (word.id === wordId ? updatedWord : word)))
      toast({
        title: 'Success',
        description: 'Vote recorded successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to vote',
        variant: 'destructive',
      })
    }
  }

  const handleCreateBrief = async (
    wordId: number,
    briefText: string,
    explanation: string,
    theory: TheoryKey
  ) => {
    try {
      const response = await fetch(`/api/words/${wordId}/briefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brief: briefText,
          explanation,
          theory,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create brief')
      }

      const updatedWord = await response.json()
      setWords(words.map((word) => (word.id === wordId ? updatedWord : word)))
      toast({
        title: 'Success',
        description: 'Brief created successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to create brief',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Plover Brief Voting</h1>
        <div className="flex items-center gap-4">
          <TheoryIndex />
          <UserAccountNav />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search words..."
            className="pl-10"
          />
        </div>
        <AddWordButton onAddWord={handleAddWord} />
      </div>

      <WordList
        words={words}
        onVote={handleVote}
        onCreateBrief={handleCreateBrief}
      />
    </div>
  )
}
