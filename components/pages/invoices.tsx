"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Plus,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  MoreHorizontal,
} from "lucide-react"

// Mock data for invoice stats
const invoiceStats = [
  {
    title: "Total Revenue",
    value: "$847,290",
    delta: "+12.5%",
    deltaType: "positive" as const,
    subtitle: "this month",
    icon: DollarSign,
  },
  {
    title: "Paid Invoices",
    value: "156",
    delta: "+23",
    deltaType: "positive" as const,
    subtitle: "this month",
    icon: CheckCircle,
  },
  {
    title: "Pending Invoices",
    value: "42",
    delta: "+8",
    deltaType: "neutral" as const,
    subtitle: "awaiting payment",
    icon: Clock,
  },
  {
    title: "Overdue Invoices",
    value: "7",
    delta: "-3",
    deltaType: "negative" as const,
    subtitle: "vs last month",
    icon: AlertCircle,
  },
]

// Mock data for invoices
const invoicesData = [
  {
    id: "INV-2024-001",
    client: "Acme Corporation",
    amount: 15750.0,
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    status: "Paid",
  },
  {
    id: "INV-2024-002",
    client: "TechStart Inc.",
    amount: 8900.0,
    issueDate: "2024-01-18",
    dueDate: "2024-02-17",
    status: "Pending",
  },
  {
    id: "INV-2024-003",
    client: "Global Solutions Ltd.",
    amount: 22400.0,
    issueDate: "2024-01-10",
    dueDate: "2024-02-09",
    status: "Overdue",
  },
  {
    id: "INV-2024-004",
    client: "Innovation Labs",
    amount: 12300.0,
    issueDate: "2024-01-22",
    dueDate: "2024-02-21",
    status: "Sent",
  },
  {
    id: "INV-2024-005",
    client: "Digital Dynamics",
    amount: 6750.0,
    issueDate: "2024-01-25",
    dueDate: "2024-02-24",
    status: "Paid",
  },
  {
    id: "INV-2024-006",
    client: "Future Systems",
    amount: 18900.0,
    issueDate: "2024-01-12",
    dueDate: "2024-02-11",
    status: "Pending",
  },
  {
    id: "INV-2024-007",
    client: "Smart Solutions",
    amount: 9450.0,
    issueDate: "2024-01-08",
    dueDate: "2024-02-07",
    status: "Overdue",
  },
  {
    id: "INV-2024-008",
    client: "NextGen Technologies",
    amount: 14200.0,
    issueDate: "2024-01-28",
    dueDate: "2024-02-27",
    status: "Sent",
  },
  {
    id: "INV-2024-009",
    client: "CloudFirst Corp",
    amount: 11800.0,
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    status: "Paid",
  },
  {
    id: "INV-2024-010",
    client: "DataFlow Systems",
    amount: 16500.0,
    issueDate: "2024-01-30",
    dueDate: "2024-03-01",
    status: "Pending",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "Pending":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20"
    case "Overdue":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "Sent":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid":
      return CheckCircle
    case "Pending":
      return Clock
    case "Overdue":
      return AlertCircle
    case "Sent":
      return FileText
    default:
      return FileText
  }
}

export function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredInvoices, setFilteredInvoices] = useState(invoicesData)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredInvoices(invoicesData)
    } else {
      const filtered = invoicesData.filter(
        (invoice) =>
          invoice.id.toLowerCase().includes(query.toLowerCase()) ||
          invoice.client.toLowerCase().includes(query.toLowerCase()) ||
          invoice.status.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredInvoices(filtered)
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {invoiceStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  <span
                    className={
                      stat.deltaType === "positive"
                        ? "text-green-500"
                        : stat.deltaType === "negative"
                          ? "text-red-500"
                          : "text-muted-foreground"
                    }
                  >
                    {stat.delta}
                  </span>
                  <span className="text-muted-foreground">{stat.subtitle}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Header with Search and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 bg-muted border-border"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>Manage your invoices and track payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const StatusIcon = getStatusIcon(invoice.status)
                const isOverdue = invoice.status === "Overdue"
                const isPending = invoice.status === "Pending"

                return (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{invoice.client}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${invoice.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(invoice.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-sm ${isOverdue ? "text-red-500 font-medium" : ""}`}>
                        {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(invoice.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Empty State */}
          {filteredInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search terms." : "Get started by creating your first invoice."}
              </p>
              {!searchQuery && (
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Invoice
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
