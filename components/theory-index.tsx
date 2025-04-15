import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the stenography theories and their associated colors
export const theories = {
  phoenix: {
    name: "Phoenix Theory",
    color: "bg-red-100 border-red-300 text-red-800",
    description: "Emphasizes phonetic writing with fewer briefs",
  },
  plover: {
    name: "Plover Theory",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    description: "Open-source theory focused on ergonomics and efficiency",
  },
  stened: {
    name: "StenEd Theory",
    color: "bg-green-100 border-green-300 text-green-800",
    description: "Traditional theory taught in many court reporting schools",
  },
  magnum: {
    name: "Magnum Steno",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description: "Modern theory with emphasis on brief forms",
  },
  philadelphia: {
    name: "Philadelphia Clinic",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    description: "Theory developed at Temple University",
  },
  chicago: {
    name: "Chicago Theory",
    color: "bg-orange-100 border-orange-300 text-orange-800",
    description: "Theory with roots in Chicago court reporting",
  },
  other: {
    name: "Other/Custom",
    color: "bg-gray-100 border-gray-300 text-gray-800",
    description: "Custom or hybrid theory approaches",
  },
}

export type TheoryKey = keyof typeof theories

export function TheoryBadge({ theory }: { theory: TheoryKey }) {
  const theoryInfo = theories[theory]
  return (
    <Badge variant="outline" className={`${theoryInfo.color} border`}>
      {theoryInfo.name}
    </Badge>
  )
}

export function TheoryIndex() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stenography Theories</CardTitle>
        <CardDescription>Color coding for different stenography theories</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {Object.entries(theories).map(([key, theory]) => (
          <div key={key} className="flex items-start gap-2">
            <TheoryBadge theory={key as TheoryKey} />
            <p className="text-sm text-muted-foreground">{theory.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
