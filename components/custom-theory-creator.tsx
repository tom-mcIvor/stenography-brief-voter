"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

const colorOptions = [
  { value: "teal", label: "Teal", classes: "bg-teal-500 border-teal-600 text-white" },
  { value: "pink", label: "Pink", classes: "bg-pink-500 border-pink-600 text-white" },
  { value: "indigo", label: "Indigo", classes: "bg-indigo-500 border-indigo-600 text-white" },
  { value: "orange", label: "Orange", classes: "bg-orange-500 border-orange-600 text-white" },
  { value: "lime", label: "Lime", classes: "bg-lime-500 border-lime-600 text-white" },
  { value: "rose", label: "Rose", classes: "bg-rose-500 border-rose-600 text-white" },
  { value: "cyan", label: "Cyan", classes: "bg-cyan-500 border-cyan-600 text-white" },
  { value: "fuchsia", label: "Fuchsia", classes: "bg-fuchsia-500 border-fuchsia-600 text-white" },
]

export function CustomTheoryCreator() {
  const [theoryName, setTheoryName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState("teal")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!theoryName.trim()) {
      toast({
        title: "Theory name required",
        description: "Please enter a name for your custom theory",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save the custom theory to the user's account
    toast({
      title: "Custom theory created",
      description: `Your theory "${theoryName}" has been created successfully.`,
    })

    // Reset form
    setTheoryName("")
    setDescription("")
    setSelectedColor("teal")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Custom Theory</CardTitle>
        <CardDescription>Define your own stenography theory and color coding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theory-name">Theory Name</Label>
          <Input
            id="theory-name"
            value={theoryName}
            onChange={(e) => setTheoryName(e.target.value)}
            placeholder="Enter a name for your theory"
          />
          <p className="text-xs text-muted-foreground">
            Choose a descriptive name that reflects your approach to stenography
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your theory's approach and principles"
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <Label>Color</Label>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <RadioGroupItem value={color.value} id={color.value} className="sr-only" />
                <Label
                  htmlFor={color.value}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${
                    selectedColor === color.value ? color.classes : "bg-muted"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${color.classes}`} />
                  <span className={selectedColor === color.value ? "text-white" : ""}>{color.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-4 border rounded-md">
            <div className="flex items-start gap-2">
              <div
                className={`w-5 h-5 rounded-full ${
                  colorOptions.find((c) => c.value === selectedColor)?.classes.split(" ")[0]
                } border flex-shrink-0 mt-0.5`}
              />
              <div>
                <p className="text-sm font-medium">{theoryName || "Your Theory Name"}</p>
                <p className="text-xs text-muted-foreground">
                  {description || "Your theory description will appear here"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Create Custom Theory
        </Button>
      </CardFooter>
    </Card>
  )
}
