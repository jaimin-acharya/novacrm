"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { NewProjectModal } from "@/components/modals/new-project-modal"
import { Search, Filter, Plus, Calendar, DollarSign, Users, FolderOpen, Clock, CheckCircle, Pause } from "lucide-react"

// Mock data for project stats
const projectStats = [
  {
    title: "Total Projects",
    value: "24",
    delta: "+3",
    deltaType: "positive" as const,
    subtitle: "this month",
    icon: FolderOpen,
  },
  {
    title: "Active Projects",
    value: "18",
    delta: "+2",
    deltaType: "positive" as const,
    subtitle: "in progress",
    icon: Clock,
  },
  {
    title: "Completed",
    value: "12",
    delta: "+4",
    deltaType: "positive" as const,
    subtitle: "this quarter",
    icon: CheckCircle,
  },
  {
    title: "On Hold",
    value: "3",
    delta: "-1",
    deltaType: "negative" as const,
    subtitle: "vs last month",
    icon: Pause,
  },
]

// Mock data for projects
const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance.",
    status: "In Progress",
    priority: "High",
    progress: 75,
    dueDate: "2024-02-15",
    spend: 45000,
    budget: 60000,
    teamMembers: [
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
      { name: "Michael Chen", avatar: "/professional-man.png" },
      { name: "Emily Rodriguez", avatar: "/woman-designer.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
    ],
    membersCount: 6,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app development for customer engagement and loyalty program.",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    dueDate: "2024-03-30",
    spend: 12000,
    budget: 80000,
    teamMembers: [
      { name: "Michael Chen", avatar: "/professional-man.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
    ],
    membersCount: 4,
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description: "Real-time analytics dashboard for business intelligence and reporting capabilities.",
    status: "In Progress",
    priority: "High",
    progress: 60,
    dueDate: "2024-01-20",
    spend: 28000,
    budget: 45000,
    teamMembers: [
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
      { name: "Emily Rodriguez", avatar: "/woman-designer.png" },
      { name: "Lisa Thompson", avatar: "/woman-marketing.png" },
    ],
    membersCount: 5,
  },
  {
    id: 4,
    name: "Customer Support Portal",
    description: "Self-service portal for customers with ticketing system and knowledge base integration.",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    dueDate: "2023-12-15",
    spend: 35000,
    budget: 40000,
    teamMembers: [
      { name: "Michael Chen", avatar: "/professional-man.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
      { name: "Lisa Thompson", avatar: "/woman-marketing.png" },
    ],
    membersCount: 3,
  },
  {
    id: 5,
    name: "Security Audit & Compliance",
    description: "Comprehensive security audit and implementation of compliance measures for data protection.",
    status: "On Hold",
    priority: "Low",
    progress: 15,
    dueDate: "2024-04-10",
    spend: 8000,
    budget: 25000,
    teamMembers: [{ name: "David Kim", avatar: "/man-engineer.png" }],
    membersCount: 2,
  },
  {
    id: 6,
    name: "Marketing Automation",
    description: "Implementation of marketing automation tools and workflows for lead nurturing.",
    status: "In Progress",
    priority: "Medium",
    progress: 40,
    dueDate: "2024-02-28",
    spend: 18000,
    budget: 35000,
    teamMembers: [
      { name: "Lisa Thompson", avatar: "/woman-marketing.png" },
      { name: "Emily Rodriguez", avatar: "/woman-designer.png" },
    ],
    membersCount: 3,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "In Progress":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "Planning":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20"
    case "On Hold":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "border-red-500 text-red-500"
    case "Medium":
      return "border-amber-500 text-amber-500"
    case "Low":
      return "border-green-500 text-green-500"
    default:
      return "border-gray-500 text-gray-500"
  }
}

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [projects, setProjects] = useState(projectsData)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.status.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredProjects(filtered)
    }
  }

  const handleNewProject = (newProject: any) => {
    const project = {
      ...newProject,
      id: projects.length + 1,
      dueDate: newProject.dueDate.toISOString().split("T")[0],
    }
    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    setFilteredProjects(updatedProjects)
  }

  useState(() => {
    setFilteredProjects(projects)
  }, [projects])

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projectStats.map((stat, index) => {
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
                  <span className={stat.deltaType === "positive" ? "text-green-500" : "text-red-500"}>
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
              placeholder="Search projects..."
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
        <Button className="gap-2" onClick={() => setShowNewProjectModal(true)}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">
                    ${project.spend.toLocaleString()} / ${project.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.membersCount} members</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms." : "Get started by creating your first project."}
          </p>
          {!searchQuery && (
            <Button className="gap-2" onClick={() => setShowNewProjectModal(true)}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          )}
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal open={showNewProjectModal} onOpenChange={setShowNewProjectModal} onSubmit={handleNewProject} />
    </div>
  )
}
