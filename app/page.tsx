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
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddWord = async (
    word: string,
    description: string,
    examples: string[],
    initialBrief: string,
    theory: TheoryKey
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
          theory,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add word')
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
        description: 'Failed to add word',
        variant: 'destructive',
      })
      return false
    }
  }

  const handleVote = async (wordId: number, briefId: number) => {
    try {
      const response = await fetch(`/api/words/${wordId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ briefId }),
      })

      if (!response.ok) {
        throw new Error('Failed to vote')
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
        description: 'Failed to record vote',
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
        throw new Error('Failed to create brief')
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
        description: 'Failed to create brief',
        variant: 'destructive',
      })
    }
  }

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">StenoBriefs</h1>
          <p className="text-muted-foreground">
            Vote for the best stenography briefs for the most common English
            words
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserAccountNav />
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <AddWordButton onAddWord={handleAddWord} />
          </div>

          <div className="rounded-lg border shadow-sm">
            <div className="p-4 flex items-center justify-between border-b bg-muted/50">
              <h2 className="font-semibold">Top 1,000 Common Words</h2>
              <div className="flex items-center gap-2 text-sm">
                <span>Sort by:</span>
                <select className="border rounded px-2 py-1 text-sm bg-background">
                  <option>Alphabetical</option>
                  <option>Most Voted</option>
                  <option>Recently Added</option>
                </select>
              </div>
            </div>
            <WordList
              words={filteredWords}
              onVote={handleVote}
              onCreateBrief={handleCreateBrief}
            />
          </div>
        </div>
        <div className="md:col-span-1 space-y-6">
          <TheoryIndex />

          <div className="rounded-lg border p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M3 5h4" />
                <path d="M19 17v4" />
                <path d="M17 19h4" />
              </svg>
              Upgrade to Pro
            </h3>
            <p className="text-sm text-amber-800 mb-3">
              Get access to premium features like analytics, practice drills,
              and unlimited exports.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
