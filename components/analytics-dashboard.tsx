"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumFeature } from "./premium-feature"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("usage")

  return (
    <PremiumFeature
      premiumRequired={true}
      featureName="Analytics Dashboard"
      tooltipText="Upgrade to Pro to access detailed analytics about your stenography practice"
    >
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Track your stenography progress and brief usage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="usage" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usage">Brief Usage</TabsTrigger>
              <TabsTrigger value="speed">Speed Progress</TabsTrigger>
              <TabsTrigger value="theories">Theory Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="usage" className="space-y-4">
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20 mt-4">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  <p className="text-muted-foreground mt-2">Brief usage statistics would appear here</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="speed" className="space-y-4">
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20 mt-4">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  <p className="text-muted-foreground mt-2">Speed progress chart would appear here</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="theories" className="space-y-4">
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20 mt-4">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  <p className="text-muted-foreground mt-2">Theory usage breakdown would appear here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PremiumFeature>
  )
}
