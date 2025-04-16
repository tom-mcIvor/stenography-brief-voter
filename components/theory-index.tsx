import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Define the stenography theories and their associated colors
export const theories = {
  phoenix: {
    name: "Phoenix Theory",
    color: "bg-red-500 border-red-600 text-white",
    description: "Emphasizes phonetic writing with fewer briefs",
  },
  plover: {
    name: "Plover Theory",
    color: "bg-blue-500 border-blue-600 text-white",
    description: "Open-source theory focused on ergonomics and efficiency",
  },
  stened: {
    name: "StenEd Theory",
    color: "bg-green-500 border-green-600 text-white",
    description: "Traditional theory taught in many court reporting schools",
  },
  magnum: {
    name: "Magnum Steno",
    color: "bg-fuchsia-500 border-fuchsia-600 text-white",
    description: "Modern theory with emphasis on brief forms",
  },
  lapwing: {
    name: "Lapwing Theory",
    color: "bg-amber-500 border-amber-600 text-white",
    description: "Theory developed from plover theory by Aerick for less ambiguity",
  },
  other: {
    name: "Other/Custom",
    color: "bg-gray-500 border-gray-600 text-white",
    description: "Custom or hybrid theory approaches",
  },
}

export type TheoryKey = keyof typeof theories

export function TheoryBadge({ theory, showName = true }: { theory: TheoryKey | string; showName?: boolean }) {
  // Check if the theory exists in our theories object
  // If not, default to "other"
  const theoryKey = Object.keys(theories).includes(theory) ? theory : "other"
  const theoryInfo = theories[theoryKey as TheoryKey]

  return (
    <Badge variant="outline" className={`${theoryInfo.color} border`}>
      {showName ? theoryInfo.name : ""}
    </Badge>
  )
}

export function TheoryColorIndicator({ theory }: { theory: TheoryKey | string }) {
  // Check if the theory exists in our theories object
  // If not, default to "other"
  const theoryKey = Object.keys(theories).includes(theory) ? theory : "other"
  const theoryInfo = theories[theoryKey as TheoryKey]

  return (
    <div
      className={`w-3 h-3 rounded-full ${theoryInfo.color.split(" ")[0]} border border-${theoryInfo.color.split(" ")[1]}`}
    />
  )
}

export function TheoryIndex() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Stenography Theories</CardTitle>
          <CardDescription>Color coding for different stenography theories</CardDescription>
        </div>
        <Button size="sm" asChild>
          <Link href="/create-theory">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Theory
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3">
        {Object.entries(theories).map(([key, theory]) => (
          <div key={key} className="flex items-start gap-2">
            <div
              className={`w-5 h-5 rounded-full ${theory.color.split(" ")[0]} border ${theory.color.split(" ")[1]} flex-shrink-0 mt-0.5`}
            />
            <div>
              <p className="text-sm font-medium">{theory.name}</p>
              <p className="text-xs text-muted-foreground">{theory.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
