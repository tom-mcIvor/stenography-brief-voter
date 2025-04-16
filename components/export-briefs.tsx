"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PremiumFeature } from "./premium-feature"
import { Download, FileDown } from "lucide-react"

export function ExportBriefs() {
  const [format, setFormat] = useState("json")
  const [selectedTheories, setSelectedTheories] = useState<string[]>(["phoenix", "plover"])

  const handleTheoryChange = (theory: string) => {
    setSelectedTheories(
      selectedTheories.includes(theory) ? selectedTheories.filter((t) => t !== theory) : [...selectedTheories, theory],
    )
  }

  return (
    <PremiumFeature
      premiumRequired={true}
      featureName="Export Briefs"
      tooltipText="Free users can export up to 10 briefs per month. Upgrade to Pro for unlimited exports."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Export Briefs
          </CardTitle>
          <CardDescription>Export your briefs in various formats for use in other applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="export-format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="export-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="txt">Plain Text</SelectItem>
                <SelectItem value="rtf">RTF Dictionary</SelectItem>
                <SelectItem value="plover">Plover Dictionary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Include Theories</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="phoenix"
                  checked={selectedTheories.includes("phoenix")}
                  onCheckedChange={() => handleTheoryChange("phoenix")}
                />
                <Label htmlFor="phoenix" className="text-sm font-normal">
                  Phoenix Theory
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plover"
                  checked={selectedTheories.includes("plover")}
                  onCheckedChange={() => handleTheoryChange("plover")}
                />
                <Label htmlFor="plover" className="text-sm font-normal">
                  Plover Theory
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stened"
                  checked={selectedTheories.includes("stened")}
                  onCheckedChange={() => handleTheoryChange("stened")}
                />
                <Label htmlFor="stened" className="text-sm font-normal">
                  StenEd Theory
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="magnum"
                  checked={selectedTheories.includes("magnum")}
                  onCheckedChange={() => handleTheoryChange("magnum")}
                />
                <Label htmlFor="magnum" className="text-sm font-normal">
                  Magnum Steno
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lapwing"
                  checked={selectedTheories.includes("lapwing")}
                  onCheckedChange={() => handleTheoryChange("lapwing")}
                />
                <Label htmlFor="lapwing" className="text-sm font-normal">
                  Lapwing Theory
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="other"
                  checked={selectedTheories.includes("other")}
                  onCheckedChange={() => handleTheoryChange("other")}
                />
                <Label htmlFor="other" className="text-sm font-normal">
                  Other/Custom
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-votes" />
                <Label htmlFor="include-votes" className="text-sm font-normal">
                  Include vote counts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="top-voted-only" />
                <Label htmlFor="top-voted-only" className="text-sm font-normal">
                  Export only top-voted briefs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="my-briefs-only" />
                <Label htmlFor="my-briefs-only" className="text-sm font-normal">
                  Export only my briefs
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Briefs
          </Button>
        </CardFooter>
      </Card>
    </PremiumFeature>
  )
}
