'use client'

import { ChevronUp, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { CreateBriefButton } from './create-brief-button'
import { useToast } from '@/hooks/use-toast'
import { type TheoryKey, theories } from './theory-index'

// Updated interface for briefs with theory
interface Brief {
  id: number
  brief: string
  votes: number
  isUserVoted: boolean
  theory: TheoryKey
}

interface Word {
  id: number
  word: string
  briefs: Brief[]
  frequency: number | null
  description?: string
  examples?: string[]
}

interface WordListProps {
  words: Word[]
  onVote: (wordId: number, briefId: number) => void
  onCreateBrief: (
    wordId: number,
    briefText: string,
    explanation: string,
    theory: TheoryKey
  ) => void
}

export default function WordList({
  words,
  onVote,
  onCreateBrief,
}: WordListProps) {
  const { toast } = useToast()

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
              onCreateBrief={onCreateBrief}
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
                      className={`w-3 h-12 rounded-l-md ${
                        theories[brief.theory]?.color.split(' ')[0] ||
                        theories.other.color.split(' ')[0]
                      }`}
                    />
                    <span className="font-mono text-sm px-2 py-1 rounded">
                      {brief.brief}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {brief.votes} votes
                  </span>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white text-xs px-2 py-1 rounded top-0 right-12 pointer-events-none">
                  {theories[brief.theory]?.name || 'Unknown Theory'}
                </div>
                <Button
                  variant={brief.isUserVoted ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => onVote(word.id, brief.id)}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  {brief.isUserVoted ? 'Unvote' : 'Vote'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
