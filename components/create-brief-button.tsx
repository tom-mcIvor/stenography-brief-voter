"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenLine } from "lucide-react"
import { type TheoryKey, theories } from "./theory-index"

interface CreateBriefButtonProps {
  wordId: number
  wordText: string
  onCreateBrief: (wordId: number, brief: string, explanation: string, theory: TheoryKey) => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CreateBriefButton({
  wordId,
  wordText,
  onCreateBrief,
  variant = "default",
  size = "default",
  className,
}: CreateBriefButtonProps) {
  const [brief, setBrief] = useState("")
  const [explanation, setExplanation] = useState("")
  const [theory, setTheory] = useState<TheoryKey>("phoenix")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Validate the brief
    if (!brief.trim()) {
      setError("Please enter a brief")
      return
    }

    // Submit the brief
    onCreateBrief(wordId, brief, explanation, theory)

    // Reset form and close dialog
    setBrief("")
    setExplanation("")
    setTheory("phoenix")
    setError("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <PenLine className="h-4 w-4 mr-2" />
          Create New Brief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new brief for &quot;{wordText}&quot;</DialogTitle>
          <DialogDescription>
            Share your stenography brief with the community. Good briefs are easy to remember and efficient to type.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="brief" className="font-medium">
              Your Brief
            </Label>
            <Input
              id="brief"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Enter your brief"
              className="font-mono"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-xs text-muted-foreground">
              Use standard stenography notation (e.g., TEFT for &quot;test&quot;)
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="theory" className="font-medium">
              Stenography Theory
            </Label>
            <Select value={theory} onValueChange={(value) => setTheory(value as TheoryKey)}>
              <SelectTrigger id="theory">
                <SelectValue placeholder="Select a theory" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(theories).map(([key, theory]) => (
                  <SelectItem key={key} value={key}>
                    {theory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Select the stenography theory this brief is based on</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="explanation" className="font-medium">
              Why is this brief effective? (optional)
            </Label>
            <Textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain your reasoning for this brief"
              className="resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Explaining your brief helps others understand your approach and learn from it.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Brief</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
