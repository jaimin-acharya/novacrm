"use client"

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Award, Users, BarChart3 } from "lucide-react"

// Mock data for performance metrics
const performanceMetrics = [
  {
    title: "Overall Performance",
    value: "87.5%",
    delta: "+5.2%",
    deltaType: "positive" as const,
    subtitle: "vs last quarter",
    icon: BarChart3,
  },
  {
    title: "Goals Achieved",
    value: "142",
    delta: "+18",
    deltaType: "positive" as const,
    subtitle: "this quarter",
    icon: Target,
  },
  {
    title: "Team Efficiency",
    value: "92.3%",
    delta: "-1.8%",
    deltaType: "negative" as const,
    subtitle: "vs last month",
    icon: Users,
  },
  {
    title: "Recognition Score",
    value: "4.8",
    delta: "+0.3",
    deltaType: "positive" as const,
    subtitle: "out of 5.0",
    icon: Award,
  },
]

// Mock data for Performance Trend chart
const performanceTrendData = [
  { month: "Jan", performance: 78, efficiency: 82 },
  { month: "Feb", performance: 82, efficiency: 85 },
  { month: "Mar", performance: 79, efficiency: 83 },
  { month: "Apr", performance: 85, efficiency: 88 },
  { month: "May", performance: 88, efficiency: 90 },
  { month: "Jun", performance: 92, efficiency: 94 },
  { month: "Jul", performance: 89, efficiency: 91 },
  { month: "Aug", performance: 94, efficiency: 96 },
  { month: "Sep", performance: 91, efficiency: 93 },
  { month: "Oct", performance: 96, efficiency: 98 },
  { month: "Nov", performance: 93, efficiency: 95 },
  { month: "Dec", performance: 98, efficiency: 97 },
]

// Mock data for Goals Progress chart
const goalsProgressData = [
  { category: "Sales", progress: 95, target: 100 },
  { category: "Marketing", progress: 87, target: 100 },
  { category: "Development", progress: 92, target: 100 },
  { category: "Support", progress: 78, target: 100 },
  { category: "Design", progress: 89, target: 100 },
  { category: "Operations", progress: 84, target: 100 },
]

// Mock data for Team Performance
const teamPerformanceData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    avatar: "/professional-woman.png",
    score: 94,
    trend: "up",
    trendValue: "+3.2%",
    grade: "Excellent",
    goalsProgress: 88,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    avatar: "/professional-man.png",
    score: 91,
    trend: "up",
    trendValue: "+1.8%",
    grade: "Excellent",
    goalsProgress: 92,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    avatar: "/woman-designer.png",
    score: 87,
    trend: "down",
    trendValue: "-2.1%",
    grade: "Good",
    goalsProgress: 76,
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "/man-engineer.png",
    score: 89,
    trend: "up",
    trendValue: "+4.5%",
    grade: "Good",
    goalsProgress: 85,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Manager",
    avatar: "/woman-marketing.png",
    score: 82,
    trend: "up",
    trendValue: "+2.3%",
    grade: "Good",
    goalsProgress: 79,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Sales Director",
    avatar: "/placeholder.svg?key=james",
    score: 96,
    trend: "up",
    trendValue: "+5.1%",
    grade: "Excellent",
    goalsProgress: 95,
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "HR Specialist",
    avatar: "/placeholder.svg?key=maria",
    score: 73,
    trend: "down",
    trendValue: "-1.4%",
    grade: "Needs Improvement",
    goalsProgress: 68,
  },
  {
    id: 8,
    name: "Alex Turner",
    role: "Data Scientist",
    avatar: "/placeholder.svg?key=alex",
    score: 88,
    trend: "up",
    trendValue: "+3.7%",
    grade: "Good",
    goalsProgress: 83,
  },
]

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "Excellent":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "Good":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "Needs Improvement":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-md">
        <p className="text-sm font-medium text-popover-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes("performance") || entry.name.includes("efficiency") || entry.name.includes("progress")
              ? "%"
              : ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PerformancePage() {
  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {metric.deltaType === "positive" && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {metric.deltaType === "negative" && <TrendingDown className="h-3 w-3 text-red-500" />}
                  <span
                    className={
                      metric.deltaType === "positive"
                        ? "text-green-500"
                        : metric.deltaType === "negative"
                          ? "text-red-500"
                          : "text-muted-foreground"
                    }
                  >
                    {metric.delta}
                  </span>
                  <span className="text-muted-foreground">{metric.subtitle}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Monthly performance and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceTrendData}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#performanceGradient)"
                  strokeWidth={2}
                  name="Performance"
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#efficiencyGradient)"
                  strokeWidth={2}
                  name="Efficiency"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Goals Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
            <CardDescription>Department-wise goal achievement progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={goalsProgressData} layout="horizontal">
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="progress" fill="url(#barGradient)" radius={[0, 4, 4, 0]} name="Progress" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Individual performance scores and goal progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformanceData.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold">{member.score}</span>
                          <div className="flex items-center gap-1">
                            {member.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs ${member.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                              {member.trendValue}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Performance Score</p>
                      </div>
                      <Badge variant="outline" className={getGradeColor(member.grade)}>
                        {member.grade}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Goals Progress</span>
                      <span className="font-medium">{member.goalsProgress}%</span>
                    </div>
                    <Progress value={member.goalsProgress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
