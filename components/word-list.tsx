"use client"

import { useState } from "react"
import { ChevronUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { CreateBriefButton } from "./create-brief-button"
import { useToast } from "@/hooks/use-toast"
import { type TheoryKey, theories } from "./theory-index"

// Updated interface for briefs with theory
interface Brief {
  id: number
  brief: string
  votes: number
  isUserVoted: boolean
  theory: TheoryKey
}

// Sample data - in a real app, this would come from a database
const sampleWords = [
  {
    id: 1,
    word: "the",
    briefs: [
      { id: 1, brief: "T", votes: 0, isUserVoted: false, theory: "phoenix" as TheoryKey },
      { id: 2, brief: "THE", votes: 0, isUserVoted: false, theory: "stened" as TheoryKey },
      { id: 3, brief: "-T", votes: 0, isUserVoted: false, theory: "plover" as TheoryKey },
    ],
    frequency: 1,
  },
  {
    id: 2,
    word: "be",
    briefs: [
      { id: 4, brief: "B", votes: 0, isUserVoted: false, theory: "phoenix" as TheoryKey },
      { id: 5, brief: "BE", votes: 0, isUserVoted: false, theory: "magnum" as TheoryKey },
    ],
    frequency: 2,
  },
  {
    id: 3,
    word: "to",
    briefs: [
      { id: 6, brief: "TO", votes: 0, isUserVoted: false, theory: "stened" as TheoryKey },
      { id: 7, brief: "TO", votes: 0, isUserVoted: false, theory: "plover" as TheoryKey },
    ],
    frequency: 3,
  },
  {
    id: 4,
    word: "of",
    briefs: [
      { id: 8, brief: "OF", votes: 0, isUserVoted: false, theory: "other" as TheoryKey },
      { id: 9, brief: "-F", votes: 0, isUserVoted: false, theory: "lapwing" as TheoryKey },
    ],
    frequency: 4,
  },
  {
    id: 5,
    word: "and",
    briefs: [
      { id: 10, brief: "SKP", votes: 0, isUserVoted: false, theory: "phoenix" as TheoryKey },
      { id: 11, brief: "APBD", votes: 0, isUserVoted: false, theory: "stened" as TheoryKey },
      { id: 12, brief: "APD", votes: 0, isUserVoted: false, theory: "other" as TheoryKey },
    ],
    frequency: 5,
  },
]

export default function WordList() {
  const [words, setWords] = useState(sampleWords)
  const { toast } = useToast()

  // Generate a unique ID for new briefs
  const getNextBriefId = () => {
    const allBriefIds = words.flatMap((word) => word.briefs.map((brief) => brief.id))
    return Math.max(...allBriefIds) + 1
  }

  const handleVote = (wordId: number, briefId: number) => {
    setWords(
      words.map((word) => {
        if (word.id === wordId) {
          return {
            ...word,
            briefs: word.briefs.map((brief) => {
              if (brief.id === briefId) {
                // Toggle vote state
                if (brief.isUserVoted) {
                  // If already voted, remove the vote
                  return {
                    ...brief,
                    votes: brief.votes - 1,
                    isUserVoted: false,
                  }
                } else {
                  // If not voted, add a vote
                  return {
                    ...brief,
                    votes: brief.votes + 1,
                    isUserVoted: true,
                  }
                }
              }
              return brief
            }),
          }
        }
        return word
      }),
    )
  }

  const handleCreateBrief = (wordId: number, briefText: string, explanation: string, theory: TheoryKey) => {
    // In a real app, you would send this to your API
    setWords(
      words.map((word) => {
        if (word.id === wordId) {
          // Check if this brief already exists
          const briefExists = word.briefs.some((brief) => brief.brief.toLowerCase() === briefText.toLowerCase())

          if (briefExists) {
            toast({
              title: "Brief already exists",
              description: `The brief "${briefText}" already exists for this word.`,
              variant: "destructive",
            })
            return word
          }

          // Add the new brief
          const newBrief = {
            id: getNextBriefId(),
            brief: briefText,
            votes: 0, // Start with 0 votes
            isUserVoted: false, // User hasn't voted yet
            theory: theory,
          }

          toast({
            title: "Brief created successfully",
            description: `Your brief "${briefText}" has been added.`,
          })

          return {
            ...word,
            briefs: [...word.briefs, newBrief],
          }
        }
        return word
      }),
    )
  }

  return (
    <div className="divide-y">
      {words.map((word) => (
        <div key={word.id} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{word.word}</h3>
              <Badge variant="outline" className="text-xs">
                #{word.frequency}
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ranked #{word.frequency} in frequency</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CreateBriefButton
              wordId={word.id}
              wordText={word.word}
              onCreateBrief={handleCreateBrief}
              variant="secondary"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            {word.briefs.map((brief) => (
              <div
                key={brief.id}
                className="flex items-center justify-between p-2 rounded-md border bg-background group relative"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-12 rounded-l-md ${theories[brief.theory]?.color.split(" ")[0] || theories.other.color.split(" ")[0]}`}
                    />
                    <span className="font-mono text-sm px-2 py-1 rounded">{brief.brief}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{brief.votes} votes</span>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white text-xs px-2 py-1 rounded top-0 right-12 pointer-events-none">
                  {theories[brief.theory]?.name || "Unknown Theory"}
                </div>
                <Button
                  variant={brief.isUserVoted ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleVote(word.id, brief.id)}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  {brief.isUserVoted ? "Unvote" : "Vote"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
