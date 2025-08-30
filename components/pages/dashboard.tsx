"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Clock, Users, Eye, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Mock data for KPI cards
const kpiData = [
  {
    title: "Payrolls Cost",
    value: "$847,290",
    delta: "+12.5%",
    deltaType: "positive" as const,
    subtitle: "vs last month",
    icon: DollarSign,
  },
  {
    title: "Total Expense",
    value: "$234,567",
    delta: "-3.2%",
    deltaType: "negative" as const,
    subtitle: "vs last month",
    icon: CreditCard,
  },
  {
    title: "Pending Payments",
    value: "$45,890",
    delta: "0%",
    deltaType: "neutral" as const,
    subtitle: "no change",
    icon: Clock,
  },
  {
    title: "Total Payrolls",
    value: "1,247",
    delta: "+8.1%",
    deltaType: "positive" as const,
    subtitle: "vs last month",
    icon: Users,
  },
]

// Mock data for Sales Performance chart
const salesData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
  { month: "Jul", sales: 72000 },
  { month: "Aug", sales: 69000 },
  { month: "Sep", sales: 75000 },
  { month: "Oct", sales: 78000 },
  { month: "Nov", sales: 82000 },
  { month: "Dec", sales: 85000 },
]

// Mock data for Email Metrics chart
const emailData = [
  { month: "Jan", ctr: 2.4, openRate: 18.2 },
  { month: "Feb", ctr: 2.8, openRate: 19.1 },
  { month: "Mar", ctr: 2.1, openRate: 17.8 },
  { month: "Apr", ctr: 3.2, openRate: 21.4 },
  { month: "May", ctr: 2.9, openRate: 20.3 },
  { month: "Jun", ctr: 3.5, openRate: 22.8 },
  { month: "Jul", ctr: 3.1, openRate: 21.9 },
  { month: "Aug", ctr: 3.8, openRate: 24.1 },
  { month: "Sep", ctr: 3.4, openRate: 23.2 },
  { month: "Oct", ctr: 4.1, openRate: 25.6 },
  { month: "Nov", ctr: 3.9, openRate: 24.8 },
  { month: "Dec", ctr: 4.3, openRate: 26.2 },
]

// Mock data for Team Directory
const teamData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "Active",
    avatar: "/professional-woman.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
    avatar: "/professional-man.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "UX Designer",
    department: "Design",
    status: "Away",
    avatar: "/woman-designer.png",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "Active",
    avatar: "/man-engineer.png",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "Inactive",
    avatar: "/woman-marketing.png",
  },
]

// Custom tooltip component for charts
interface TooltipPayload {
  color: string
  name: string
  value: number | string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-2 sm:p-3 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 max-w-[200px]">
        <p className="text-xs sm:text-sm font-medium text-popover-foreground mb-1 sm:mb-2 truncate">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2" style={{ color: entry.color }}>
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="truncate">
              {entry.name}: {entry.value}
              {entry.name.includes("Rate") ? "%" : entry.name === "sales" ? "" : ""}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
              <Skeleton className="h-3 sm:h-4 w-3 sm:w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 sm:h-8 w-12 sm:w-20 mb-2" />
              <Skeleton className="h-2 sm:h-3 w-12 sm:w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 sm:h-6 w-24 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-32 sm:w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] sm:h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 sm:h-6 w-24 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-32 sm:w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] sm:h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 sm:space-y-8">
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <UITooltip key={index}>
                <TooltipTrigger asChild>
                  <Card
                    className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">
                        {kpi.title}
                      </CardTitle>
                      <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 transition-colors duration-200 flex-shrink-0">
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <div
                        className="text-lg sm:text-2xl font-bold text-foreground animate-in zoom-in-50 duration-500 leading-tight"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {kpi.value}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        {kpi.deltaType === "positive" && (
                          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500 flex-shrink-0" />
                        )}
                        {kpi.deltaType === "negative" && (
                          <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500 flex-shrink-0" />
                        )}
                        <span
                          className={cn(
                            "transition-colors duration-200 flex-shrink-0",
                            kpi.deltaType === "positive"
                              ? "text-green-500"
                              : kpi.deltaType === "negative"
                                ? "text-red-500"
                                : "text-muted-foreground",
                          )}
                        >
                          {kpi.delta}
                        </span>
                        <span className="text-muted-foreground truncate">{kpi.subtitle}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <div className="font-medium">{kpi.title}</div>
                    <div className="text-sm text-muted-foreground">Click for detailed view</div>
                  </div>
                </TooltipContent>
              </UITooltip>
            )
          })}
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Sales Performance Chart */}
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in-0 slide-in-from-left-4 duration-700">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-base sm:text-lg">Sales Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly sales data for the past year</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <ResponsiveContainer width="100%" height={200} className="sm:!h-[300px]">
                <BarChart data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    className="sm:text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    className="sm:text-xs"
                    tick={{ fontSize: 10 }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" radius={[2, 2, 0, 0]} className="sm:!rounded-[4px_4px_0_0]">
                    {salesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="#3b82f6"
                        className="transition-all duration-200 hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Email Metrics Chart */}
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in-0 slide-in-from-right-4 duration-700">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-base sm:text-lg">Email Metrics</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Click through rate and open rate trends</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <ResponsiveContainer width="100%" height={200} className="sm:!h-[300px]">
                <LineChart data={emailData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    className="sm:text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    className="sm:text-xs"
                    tick={{ fontSize: 10 }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    className="sm:!stroke-[3px]"
                    name="Click Through Rate"
                    dot={{ fill: "#f59e0b", strokeWidth: 1, r: 3 }}
                    className="sm:![r:5] sm:!stroke-[2px]"
                    activeDot={{ r: 5, stroke: "#f59e0b", strokeWidth: 2, fill: "#fff" }}
                    className="sm:![r:8]"
                  />
                  <Line
                    type="monotone"
                    dataKey="openRate"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    className="sm:!stroke-[3px]"
                    name="Open Rate"
                    dot={{ fill: "#06b6d4", strokeWidth: 1, r: 3 }}
                    className="sm:![r:5] sm:!stroke-[2px]"
                    activeDot={{ r: 5, stroke: "#06b6d4", strokeWidth: 2, fill: "#fff" }}
                    className="sm:![r:8]"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-900">
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Team Directory</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Overview of all team members and their current status
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 sm:px-6 pb-3 sm:pb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px] px-3 sm:px-4">Name</TableHead>
                    <TableHead className="min-w-[200px] px-3 sm:px-4 hidden sm:table-cell">Email</TableHead>
                    <TableHead className="min-w-[120px] px-3 sm:px-4">Role</TableHead>
                    <TableHead className="min-w-[100px] px-3 sm:px-4 hidden md:table-cell">Department</TableHead>
                    <TableHead className="min-w-[80px] px-3 sm:px-4">Status</TableHead>
                    <TableHead className="text-right min-w-[100px] px-3 sm:px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamData.map((member, index) => (
                    <TableRow
                      key={member.id}
                      className="transition-colors duration-200 hover:bg-muted/50 animate-in fade-in-0 slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-4">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 transition-transform duration-200 hover:scale-110 flex-shrink-0">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium text-sm sm:text-base truncate">{member.name}</div>
                          <div className="text-xs text-muted-foreground sm:hidden truncate">{member.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer px-3 sm:px-4 hidden sm:table-cell text-sm">
                        {member.email}
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 text-sm">{member.role}</TableCell>
                      <TableCell className="px-3 sm:px-4 hidden md:table-cell text-sm">{member.department}</TableCell>
                      <TableCell className="px-3 sm:px-4">
                        <Badge
                          variant={
                            member.status === "Active" ? "default" : member.status === "Away" ? "secondary" : "outline"
                          }
                          className={cn(
                            "transition-all duration-200 hover:scale-105 text-xs",
                            member.status === "Active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                              : member.status === "Away"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20",
                          )}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-3 sm:px-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="transition-all duration-200 hover:scale-110 h-8 w-8 p-0"
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View profile</TooltipContent>
                          </UITooltip>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="transition-all duration-200 hover:scale-110 h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>More actions</TooltipContent>
                          </UITooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
