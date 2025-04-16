import { CustomTheoryCreator } from "@/components/custom-theory-creator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreateTheoryPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create Custom Theory</h1>
      </div>

      <CustomTheoryCreator />

      <div className="max-w-2xl mx-auto space-y-4 bg-muted/30 p-4 rounded-lg">
        <h2 className="text-lg font-medium">Tips for Creating a Theory</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Consistency:</strong> Ensure your theory follows consistent patterns for similar sounds or word
            structures.
          </li>
          <li>
            <strong>Ergonomics:</strong> Consider finger movement efficiency and hand position when designing briefs.
          </li>
          <li>
            <strong>Memorability:</strong> Create briefs that are intuitive and easy to remember.
          </li>
          <li>
            <strong>Conflict avoidance:</strong> Design your theory to minimize conflicts between similar words.
          </li>
          <li>
            <strong>Documentation:</strong> Keep detailed notes on your theory principles to help others learn your
            approach.
          </li>
        </ul>
      </div>
    </div>
  )
}
