'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import WordList from '@/components/word-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddWordButton } from '@/components/add-word-button'
import { TheoryIndex } from '@/components/theory-index'
import { UserAccountNav } from '@/components/user-account-nav'
import { useToast } from '@/hooks/use-toast'

export default function Home() {
  const { toast } = useToast()

  const handleAddWord = async (
    word: string,
    description: string,
    examples: string[],
    initialBrief: string
  ) => {
    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, description, examples, initialBrief }),
      })

      if (!response.ok) {
        throw new Error('Failed to add word')
      }

      toast({
        title: 'Word added successfully',
        description: `"${word}" has been added to the database with your brief.`,
      })
    } catch (error) {
      console.error('Error adding word:', error)
      toast({
        title: 'Failed to add word',
        description: 'There was an error adding the word. Please try again.',
        variant: 'destructive',
      })
    }
  }

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
            <WordList />
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
