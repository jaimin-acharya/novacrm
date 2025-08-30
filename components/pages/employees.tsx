"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewEmployeeModal } from "@/components/modals/new-employee-modal"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { LoadingTable } from "@/components/ui/loading-table"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Plus, Users, UserCheck, UserX, Clock, Eye, MoreHorizontal, Phone, Mail } from "lucide-react"
import { DataTableFilters } from "@/components/ui/data-table-filters"
import { cn } from "@/lib/utils"

// Declare variables here
const employeesData = [
  // Sample employee data
  {
    id: "1",
    name: "John Doe",
    avatar: "",
    email: "john@example.com",
    phone: "123-456-7890",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    joinDate: "2023-01-01",
    salary: 75000,
  },
  // Add more employee data as needed
]

const employeeStats = [
  // Sample employee stats
  {
    title: "Total Employees",
    value: 10,
    delta: "+2",
    deltaType: "positive",
    subtitle: "since last month",
    icon: Users,
  },
  {
    title: "Active Employees",
    value: 8,
    delta: "+1",
    deltaType: "positive",
    subtitle: "since last month",
    icon: UserCheck,
  },
  {
    title: "Inactive Employees",
    value: 1,
    delta: "-1",
    deltaType: "negative",
    subtitle: "since last month",
    icon: UserX,
  },
  { title: "On Leave", value: 1, delta: "0", deltaType: "neutral", subtitle: "since last month", icon: Clock },
]

const departmentOptions = [
  // Sample department options
  { label: "Engineering", value: "Engineering" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  // Add more department options as needed
]

const statusOptions = [
  // Sample status options
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Inactive", value: "Inactive" },
  // Add more status options as needed
]

const sortOptions = [
  // Sample sort options
  { label: "Name", value: "name" },
  { label: "Role", value: "role" },
  { label: "Department", value: "department" },
  { label: "Status", value: "status" },
  { label: "Join Date", value: "joinDate" },
  { label: "Salary", value: "salary" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 transition-colors duration-200"
    case "On Leave":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 transition-colors duration-200"
    case "Inactive":
      return "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 transition-colors duration-200"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20 hover:bg-gray-500/20 transition-colors duration-200"
  }
}

export function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData)
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false)
  const [employees, setEmployees] = useState(employeesData)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const activeFiltersCount = selectedDepartments.length + selectedStatuses.length

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  const clearFilters = () => {
    setSelectedDepartments([])
    setSelectedStatuses([])
    setSortField("")
    setSortDirection("asc")
    // Implement clear filters logic here
  }

  const handleNewEmployee = (newEmployee: any) => {
    setEmployees([...employees, newEmployee])
    setShowNewEmployeeModal(false)
    // Implement new employee logic here
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {employeeStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground animate-in zoom-in-50 duration-300">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className={cn(
                        "transition-colors duration-200",
                        stat.deltaType === "positive"
                          ? "text-green-500"
                          : stat.deltaType === "negative"
                            ? "text-red-500"
                            : "text-muted-foreground",
                      )}
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

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <DataTableFilters
              searchPlaceholder="Search employees..."
              searchValue={searchQuery}
              onSearchChange={handleSearch}
              filterGroups={[
                {
                  label: "Department",
                  key: "department",
                  options: departmentOptions,
                  selectedValues: selectedDepartments,
                  onSelectionChange: setSelectedDepartments,
                },
                {
                  label: "Status",
                  key: "status",
                  options: statusOptions,
                  selectedValues: selectedStatuses,
                  onSelectionChange: setSelectedStatuses,
                },
              ]}
              sortOptions={sortOptions}
              sortValue={sortField}
              sortDirection={sortDirection}
              onSortChange={(field, direction) => {
                setSortField(field)
                setSortDirection(direction)
              }}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearFilters}
            />
          </div>
          <InteractiveButton onClick={() => setShowNewEmployeeModal(true)} tooltip="Add new employee" shortcut="⌘N">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </InteractiveButton>
        </div>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>All Employees</CardTitle>
            <CardDescription>Manage your team members and their information</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingTable columns={8} rows={5} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="transition-colors duration-200 hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-110">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">
                              {employee.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">
                              {employee.phone}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{employee.role}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-muted-foreground">{employee.department}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(employee.joinDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${employee.salary.toLocaleString()}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InteractiveButton variant="ghost" size="sm" tooltip="View details">
                                <Eye className="h-4 w-4" />
                              </InteractiveButton>
                            </TooltipTrigger>
                            <TooltipContent>View employee details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InteractiveButton variant="ghost" size="sm" tooltip="More actions">
                                <MoreHorizontal className="h-4 w-4" />
                              </InteractiveButton>
                            </TooltipTrigger>
                            <TooltipContent>More actions</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {filteredEmployees.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in-50 duration-300">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No employees found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || activeFiltersCount > 0
                    ? "Try adjusting your search terms or filters."
                    : "Get started by adding your first employee."}
                </p>
                {!searchQuery && activeFiltersCount === 0 && (
                  <InteractiveButton onClick={() => setShowNewEmployeeModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </InteractiveButton>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <NewEmployeeModal
          open={showNewEmployeeModal}
          onOpenChange={setShowNewEmployeeModal}
          onSubmit={handleNewEmployee}
        />
      </div>
    </TooltipProvider>
  )
}
