"use client"

import { useState } from "react"
import { Search, Filter, Plus, Eye, Download, MoreHorizontal, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for orders
const orderStats = [
  {
    title: "Total Orders",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Pending Orders",
    value: "156",
    change: "-8.2%",
    trend: "down" as const,
    icon: Clock,
  },
  {
    title: "Completed Orders",
    value: "2,534",
    change: "+15.3%",
    trend: "up" as const,
    icon: CheckCircle,
  },
  {
    title: "Cancelled Orders",
    value: "157",
    change: "+2.1%",
    trend: "up" as const,
    icon: XCircle,
  },
]

const orders = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/professional-woman.png",
    },
    products: ["MacBook Pro", "Magic Mouse"],
    amount: 2499.0,
    status: "completed",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/professional-man.png",
    },
    products: ["iPhone 15 Pro", "AirPods Pro"],
    amount: 1299.0,
    status: "pending",
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-20",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      avatar: "/woman-designer.png",
    },
    products: ["iPad Air", "Apple Pencil"],
    amount: 899.0,
    status: "shipped",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-19",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar: "/man-engineer.png",
    },
    products: ["Apple Watch Ultra"],
    amount: 799.0,
    status: "cancelled",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-17",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      avatar: "/woman-marketing.png",
    },
    products: ["MacBook Air", "Magic Keyboard"],
    amount: 1599.0,
    status: "processing",
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-22",
    paymentMethod: "Bank Transfer",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "shipped":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "processing":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "cancelled":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Header with Search and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {order.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.products.join(", ")}</div>
                  </TableCell>
                  <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Track Order
                        </DropdownMenuItem>
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
