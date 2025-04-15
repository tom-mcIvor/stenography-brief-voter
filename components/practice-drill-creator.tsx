"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PremiumFeature } from "./premium-feature"
import { Dumbbell } from "lucide-react"

export function PracticeDrillCreator() {
  const [drillName, setDrillName] = useState("")
  const [drillType, setDrillType] = useState("word-list")
  const [content, setContent] = useState("")

  return (
    <PremiumFeature
      premiumRequired={true}
      featureName="Practice Drill Creator"
      tooltipText="Upgrade to Pro to create custom practice drills"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Practice Drill Creator
          </CardTitle>
          <CardDescription>Create custom practice drills to improve your stenography skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="drill-name">Drill Name</Label>
            <Input
              id="drill-name"
              placeholder="Enter a name for your drill"
              value={drillName}
              onChange={(e) => setDrillName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drill-type">Drill Type</Label>
            <Select value={drillType} onValueChange={setDrillType}>
              <SelectTrigger id="drill-type">
                <SelectValue placeholder="Select drill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="word-list">Word List</SelectItem>
                <SelectItem value="sentence">Sentence Practice</SelectItem>
                <SelectItem value="paragraph">Paragraph</SelectItem>
                <SelectItem value="q-and-a">Q&A Format</SelectItem>
                <SelectItem value="brief-specific">Brief-Specific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Drill Content</Label>
            <Textarea
              id="content"
              placeholder={
                drillType === "word-list"
                  ? "Enter words separated by commas or new lines"
                  : drillType === "sentence"
                    ? "Enter sentences to practice"
                    : "Enter content for your practice drill"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              {drillType === "word-list"
                ? "Pro tip: You can import words from your collections or the most common words list"
                : drillType === "brief-specific"
                  ? "Pro tip: Include specific briefs you want to practice in [brackets]"
                  : "Pro tip: You can adjust speed settings when running the drill"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create Drill</Button>
        </CardFooter>
      </Card>
    </PremiumFeature>
  )
}
