"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import WordList from "@/components/word-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddWordButton } from "@/components/add-word-button"
import { useToast } from "@/hooks/use-toast"

// Sample data structure for the words list
interface Brief {
  id: number
  brief: string
  votes: number
  isUserVoted: boolean
}

interface Word {
  id: number
  word: string
  briefs: Brief[]
  frequency: number | null
  description?: string
  examples?: string[]
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([])
  const { toast } = useToast()

  const handleAddWord = async (word: string, description: string, examples: string[], initialBrief: string) => {
    try {
      // Check if word already exists
      const wordExists = words.some((w) => w.word.toLowerCase() === word.toLowerCase())

      if (wordExists) {
        toast({
          title: "Word already exists",
          description: `The word "${word}" is already in the database.`,
          variant: "destructive",
        })
        return
      }

      // In a real app, you would call your API
      // const response = await fetch('/api/words', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ word, description, examples, initialBrief }),
      // });

      // if (!response.ok) throw new Error('Failed to add word');
      // const newWord = await response.json();

      // For demo purposes, we'll create the word locally
      const newWord: Word = {
        id: words.length ? Math.max(...words.map((w) => w.id)) + 1 : 1,
        word,
        description,
        examples,
        frequency: null, // Would be calculated in a real app
        briefs: [
          {
            id: 1,
            brief: initialBrief,
            votes: 0, // Start with 0 votes
            isUserVoted: false, // User hasn't voted yet
          },
        ],
      }

      setWords([newWord, ...words])

      toast({
        title: "Word added successfully",
        description: `"${word}" has been added to the database with your brief.`,
      })
    } catch (error) {
      console.error("Error adding word:", error)
      toast({
        title: "Failed to add word",
        description: "There was an error adding the word. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">StenoBriefs</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
        <p className="text-muted-foreground">Vote for the best stenography briefs for the most common English words</p>
      </header>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search words..." className="pl-8" />
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
  )
}
