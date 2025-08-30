"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Calendar, Users, Clock, CheckCircle } from "lucide-react"

// Mock data
const leaveStats = [
  { title: "Total Requests", value: "47", change: "+8", trend: "up" },
  { title: "Pending Approval", value: "12", change: "+3", trend: "up" },
  { title: "Approved Today", value: "5", change: "+2", trend: "up" },
  { title: "Available Days", value: "1,247", change: "-15", trend: "down" },
]

const leaveRequests = [
  {
    id: "LV-001",
    employee: { name: "Sarah Johnson", avatar: "/professional-woman.png", department: "Engineering" },
    type: "Annual Leave",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    days: 6,
    reason: "Family vacation during holidays",
    status: "pending",
    appliedDate: "2024-12-10",
    approver: "John Smith",
  },
  {
    id: "LV-002",
    employee: { name: "Michael Chen", avatar: "/professional-man.png", department: "Design" },
    type: "Sick Leave",
    startDate: "2024-12-15",
    endDate: "2024-12-16",
    days: 2,
    reason: "Medical appointment and recovery",
    status: "approved",
    appliedDate: "2024-12-14",
    approver: "Jane Doe",
  },
  {
    id: "LV-003",
    employee: { name: "Emily Rodriguez", avatar: "/woman-designer.png", department: "Marketing" },
    type: "Personal Leave",
    startDate: "2024-12-18",
    endDate: "2024-12-18",
    days: 1,
    reason: "Personal matters",
    status: "approved",
    appliedDate: "2024-12-12",
    approver: "Mike Wilson",
  },
  {
    id: "LV-004",
    employee: { name: "David Kim", avatar: "/man-engineer.png", department: "Engineering" },
    type: "Annual Leave",
    startDate: "2024-12-23",
    endDate: "2024-12-30",
    days: 6,
    reason: "Year-end vacation",
    status: "rejected",
    appliedDate: "2024-12-11",
    approver: "John Smith",
  },
  {
    id: "LV-005",
    employee: { name: "Lisa Wang", avatar: "/woman-marketing.png", department: "Sales" },
    type: "Maternity Leave",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    days: 90,
    reason: "Maternity leave",
    status: "pending",
    appliedDate: "2024-12-08",
    approver: "Sarah Brown",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Annual Leave":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "Sick Leave":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "Personal Leave":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "Maternity Leave":
      return "bg-pink-500/10 text-pink-500 border-pink-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function LeaveManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leaveStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {index === 0 && <Calendar className="h-4 w-4" />}
                {index === 1 && <Clock className="h-4 w-4" />}
                {index === 2 && <CheckCircle className="h-4 w-4" />}
                {index === 3 && <Users className="h-4 w-4" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leave Management</h2>
          <p className="text-muted-foreground">Manage employee leave requests and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Leave Calendar
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leave requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={request.employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.employee.name}</div>
                        <div className="text-sm text-muted-foreground">{request.employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(request.type)}>
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{request.days} days</TableCell>
                  <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
