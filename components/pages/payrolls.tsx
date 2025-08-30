"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Download, DollarSign, Users, Calendar, TrendingUp } from "lucide-react"

// Mock data
const payrollStats = [
  { title: "Total Payroll", value: "$847,250", change: "+12.5%", trend: "up" },
  { title: "Employees Paid", value: "156", change: "+3", trend: "up" },
  { title: "Avg Salary", value: "$5,431", change: "+2.1%", trend: "up" },
  { title: "Pending Payments", value: "8", change: "-2", trend: "down" },
]

const payrollData = [
  {
    id: "PAY-001",
    employee: { name: "Sarah Johnson", avatar: "/professional-woman.png", id: "EMP-001" },
    department: "Engineering",
    baseSalary: 8500,
    overtime: 450,
    bonuses: 1000,
    deductions: 850,
    netPay: 9100,
    payPeriod: "Dec 1-15, 2024",
    status: "paid",
    payDate: "2024-12-16",
  },
  {
    id: "PAY-002",
    employee: { name: "Michael Chen", avatar: "/professional-man.png", id: "EMP-002" },
    department: "Design",
    baseSalary: 7200,
    overtime: 0,
    bonuses: 500,
    deductions: 720,
    netPay: 6980,
    payPeriod: "Dec 1-15, 2024",
    status: "pending",
    payDate: "2024-12-16",
  },
  {
    id: "PAY-003",
    employee: { name: "Emily Rodriguez", avatar: "/woman-designer.png", id: "EMP-003" },
    department: "Marketing",
    baseSalary: 6800,
    overtime: 200,
    bonuses: 0,
    deductions: 680,
    netPay: 6320,
    payPeriod: "Dec 1-15, 2024",
    status: "paid",
    payDate: "2024-12-16",
  },
  {
    id: "PAY-004",
    employee: { name: "David Kim", avatar: "/man-engineer.png", id: "EMP-004" },
    department: "Engineering",
    baseSalary: 9200,
    overtime: 600,
    deductions: 920,
    bonuses: 0,
    netPay: 8880,
    payPeriod: "Dec 1-15, 2024",
    status: "processing",
    payDate: "2024-12-16",
  },
  {
    id: "PAY-005",
    employee: { name: "Lisa Wang", avatar: "/woman-marketing.png", id: "EMP-005" },
    department: "Sales",
    baseSalary: 7500,
    overtime: 0,
    bonuses: 1500,
    deductions: 750,
    netPay: 8250,
    payPeriod: "Dec 1-15, 2024",
    status: "paid",
    payDate: "2024-12-16",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "processing":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function PayrollsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPayrolls = payrollData.filter(
    (payroll) =>
      payroll.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {payrollStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {index === 0 && <DollarSign className="h-4 w-4" />}
                {index === 1 && <Users className="h-4 w-4" />}
                {index === 2 && <TrendingUp className="h-4 w-4" />}
                {index === 3 && <Calendar className="h-4 w-4" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payroll Management</h2>
          <p className="text-muted-foreground">Manage employee payrolls and compensation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search payrolls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Payrolls</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Bonuses</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Pay Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payroll.employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {payroll.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payroll.employee.name}</div>
                        <div className="text-sm text-muted-foreground">{payroll.employee.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{payroll.department}</TableCell>
                  <TableCell>{formatCurrency(payroll.baseSalary)}</TableCell>
                  <TableCell>{formatCurrency(payroll.overtime)}</TableCell>
                  <TableCell>{formatCurrency(payroll.bonuses)}</TableCell>
                  <TableCell>{formatCurrency(payroll.deductions)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(payroll.netPay)}</TableCell>
                  <TableCell>{payroll.payPeriod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(payroll.status)}>
                      {payroll.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Slip</DropdownMenuItem>
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
