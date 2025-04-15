import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { PracticeDrillCreator } from "@/components/practice-drill-creator"
import { ExportBriefs } from "@/components/export-briefs"
import { UserAccountNav } from "@/components/user-account-nav"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your stenography practice and briefs</p>
        </div>
        <UserAccountNav />
      </header>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Briefs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+24 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent stenography activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">Added brief "STKPWHR" for "together"</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">Voted on brief "TEFT" for "test"</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">Added word "stenographer"</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Briefs</CardTitle>
                <CardDescription>Most voted briefs this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">"TEFT" for "test"</p>
                      <p className="text-sm">42 votes</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Phoenix Theory</p>
                  </div>
                  <div className="border-b pb-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">"STKPWHR" for "together"</p>
                      <p className="text-sm">38 votes</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Plover Theory</p>
                  </div>
                  <div className="border-b pb-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">"PREPB" for "present"</p>
                      <p className="text-sm">29 votes</p>
                    </div>
                    <p className="text-xs text-muted-foreground">StenEd Theory</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="practice">
          <PracticeDrillCreator />
        </TabsContent>

        <TabsContent value="export">
          <ExportBriefs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
