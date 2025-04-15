"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CreateBriefButton } from "@/components/create-brief-button"
import { useToast } from "@/hooks/use-toast"
import { TheoryBadge, type TheoryKey, theories } from "@/components/theory-index"
import { TheoryIndex } from "@/components/theory-index"

export default function WordDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()

  // In a real app, fetch the word data based on the ID
  const [word, setWord] = useState({
    id: 1,
    word: "the",
    briefs: [
      { id: 1, brief: "T", votes: 0, isUserVoted: false, theory: "phoenix" as TheoryKey },
      { id: 2, brief: "THE", votes: 0, isUserVoted: false, theory: "stened" as TheoryKey },
      { id: 3, brief: "-T", votes: 0, isUserVoted: false, theory: "plover" as TheoryKey },
    ],
    frequency: 1,
    description: "The most common word in English, used as a definite article.",
    examples: ["The cat sat on the mat.", "Pass me the salt, please."],
    discussions: [
      {
        id: 1,
        author: "StenoExpert",
        content: "I find that using T is much faster in most contexts.",
        date: "2 days ago",
        replies: 3,
      },
      {
        id: 2,
        author: "NewStenographer",
        content: "Is there a reason why some people prefer -T over T?",
        date: "1 week ago",
        replies: 5,
      },
    ],
  })

  const handleVote = (briefId: number) => {
    setWord({
      ...word,
      briefs: word.briefs.map((brief) => {
        if (brief.id === briefId) {
          // Toggle vote state
          if (brief.isUserVoted) {
            return {
              ...brief,
              votes: brief.votes - 1,
              isUserVoted: false,
            }
          } else {
            return {
              ...brief,
              votes: brief.votes + 1,
              isUserVoted: true,
            }
          }
        }
        return brief
      }),
    })
  }

  const handleCreateBrief = (wordId: number, briefText: string, explanation: string, theory: TheoryKey) => {
    // Check if this brief already exists
    const briefExists = word.briefs.some((brief) => brief.brief.toLowerCase() === briefText.toLowerCase())

    if (briefExists) {
      toast({
        title: "Brief already exists",
        description: `The brief "${briefText}" already exists for this word.`,
        variant: "destructive",
      })
      return
    }

    // Add the new brief
    const newBrief = {
      id: Math.max(...word.briefs.map((b) => b.id)) + 1,
      brief: briefText,
      votes: 0, // Start with 0 votes
      isUserVoted: false, // User hasn't voted yet
      theory: theory,
    }

    toast({
      title: "Brief created successfully",
      description: `Your brief "${briefText}" has been added.`,
    })

    setWord({
      ...word,
      briefs: [...word.briefs, newBrief],
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{word.word}</h1>
          <Badge variant="outline">#{word.frequency}</Badge>
        </div>
        <CreateBriefButton wordId={word.id} wordText={word.word} onCreateBrief={handleCreateBrief} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Briefs</CardTitle>
                <CardDescription>Vote for the best stenography brief</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {word.briefs.map((brief) => (
                <div key={brief.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="space-y-2">
                    <span className={`font-mono text-lg px-2 py-1 rounded ${theories[brief.theory].color}`}>
                      {brief.brief}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{brief.votes} votes</span>
                      <TheoryBadge theory={brief.theory} />
                    </div>
                  </div>
                  <Button
                    variant={brief.isUserVoted ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleVote(brief.id)}
                  >
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {brief.isUserVoted ? "Unvote" : "Vote"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>Join the conversation about this word</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {word.discussions.map((discussion) => (
                <div key={discussion.id} className="p-3 rounded-md border">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{discussion.author}</span>
                    <span className="text-xs text-muted-foreground">{discussion.date}</span>
                  </div>
                  <p className="text-sm mb-2">{discussion.content}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {discussion.replies} replies
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add a comment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <TheoryIndex />

          <Card>
            <CardHeader>
              <CardTitle>Word Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">{word.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Examples</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {word.examples.map((example, i) => (
                    <li key={i}>• {example}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Frequency</h3>
                <p className="text-sm text-muted-foreground">
                  Ranked #{word.frequency} in the list of most common English words
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Words</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/word/2" className="text-sm hover:underline flex items-center justify-between">
                    <span>a</span>
                    <Badge variant="outline" className="text-xs">
                      #5
                    </Badge>
                  </Link>
                </li>
                <li>
                  <Link href="/word/3" className="text-sm hover:underline flex items-center justify-between">
                    <span>an</span>
                    <Badge variant="outline" className="text-xs">
                      #43
                    </Badge>
                  </Link>
                </li>
                <li>
                  <Link href="/word/4" className="text-sm hover:underline flex items-center justify-between">
                    <span>this</span>
                    <Badge variant="outline" className="text-xs">
                      #25
                    </Badge>
                  </Link>
                </li>
                <li>
                  <Link href="/word/5" className="text-sm hover:underline flex items-center justify-between">
                    <span>that</span>
                    <Badge variant="outline" className="text-xs">
                      #12
                    </Badge>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
