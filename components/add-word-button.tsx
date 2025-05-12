'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PlusCircle } from 'lucide-react'
import { type TheoryKey, theories } from './theory-index'
import { useToast } from '@/hooks/use-toast'

export function AddWordButton({
  onAddWord,
  variant = 'default',
  size = 'default',
  className,
}: {
  onAddWord: (
    word: string,
    description: string,
    examples: string[],
    initialBrief: string
  ) => void
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}) {
  const [word, setWord] = useState('')
  const [description, setDescription] = useState('')
  const [examples, setExamples] = useState('')
  const [initialBrief, setInitialBrief] = useState('')
  const [theory, setTheory] = useState<TheoryKey>('phoenix')
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!word.trim()) {
      newErrors.word = 'Word is required'
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!examples.trim()) {
      newErrors.examples = 'At least one example is required'
    }

    if (!initialBrief.trim()) {
      newErrors.initialBrief = 'Initial brief is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    console.log('Form submission started', {
      word,
      description,
      examples,
      initialBrief,
      theory,
    })

    if (!validateForm()) {
      console.log('Form validation failed', errors)
      return
    }

    // Split examples by new line
    const examplesList = examples
      .split('\n')
      .map((example) => example.trim())
      .filter((example) => example.length > 0)

    console.log('Processed examples:', examplesList)

    try {
      console.log('Calling onAddWord callback')
      // Call the onAddWord callback with the form data
      onAddWord(word, description, examplesList, initialBrief)

      // Reset form and close dialog
      setWord('')
      setDescription('')
      setExamples('')
      setInitialBrief('')
      setTheory('phoenix')
      setErrors({})
      setOpen(false)
      console.log('Form submission completed successfully')
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new word</DialogTitle>
          <DialogDescription>
            Add a word that's missing from our stenography database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="word" className="font-medium">
              Word
            </Label>
            <Input
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter the word"
            />
            {errors.word && (
              <p className="text-sm text-red-500">{errors.word}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of the word"
              rows={2}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="examples" className="font-medium">
              Example Usage
            </Label>
            <Textarea
              id="examples"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
              placeholder="Enter examples of the word in sentences (one per line)"
              rows={3}
            />
            {errors.examples && (
              <p className="text-sm text-red-500">{errors.examples}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Enter each example on a new line
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="initialBrief" className="font-medium">
              Initial Brief Suggestion
            </Label>
            <Input
              id="initialBrief"
              value={initialBrief}
              onChange={(e) => setInitialBrief(e.target.value)}
              placeholder="Suggest an initial stenography brief"
              className="font-mono"
            />
            {errors.initialBrief && (
              <p className="text-sm text-red-500">{errors.initialBrief}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="theory" className="font-medium">
              Stenography Theory
            </Label>
            <Select
              value={theory}
              onValueChange={(value: string) => setTheory(value as TheoryKey)}
            >
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
            <p className="text-xs text-muted-foreground">
              Select the stenography theory for this brief
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Word</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
