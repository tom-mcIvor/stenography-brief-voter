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
import { Plus } from "lucide-react"

interface SuggestBriefDialogProps {
  wordId: number
  wordText: string
  onSuggestBrief: (wordId: number, brief: string, explanation: string) => void
}

export function SuggestBriefDialog({ wordId, wordText, onSuggestBrief }: SuggestBriefDialogProps) {
  const [brief, setBrief] = useState("")
  const [explanation, setExplanation] = useState("")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Validate the brief
    if (!brief.trim()) {
      setError("Please enter a brief")
      return
    }

    // Submit the brief
    onSuggestBrief(wordId, brief, explanation)

    // Reset form and close dialog
    setBrief("")
    setExplanation("")
    setError("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Suggest a new brief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Suggest a new brief</DialogTitle>
          <DialogDescription>Suggest a new stenography brief for the word &quot;{wordText}&quot;.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="brief" className="font-medium">
              Brief
            </Label>
            <Input
              id="brief"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Enter your brief suggestion"
              className="font-mono"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-xs text-muted-foreground">
              Use standard stenography notation (e.g., TEFT for &quot;test&quot;)
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="explanation" className="font-medium">
              Explanation (optional)
            </Label>
            <Textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain why this brief is effective"
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
