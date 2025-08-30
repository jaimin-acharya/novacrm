"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Users, UserCheck, Clock, Target } from "lucide-react"

// Mock data
const recruitmentStats = [
  { title: "Open Positions", value: "23", change: "+5", trend: "up" },
  { title: "Active Candidates", value: "147", change: "+12", trend: "up" },
  { title: "Interviews Scheduled", value: "18", change: "+3", trend: "up" },
  { title: "Offers Extended", value: "8", change: "+2", trend: "up" },
]

const candidates = [
  {
    id: "CND-001",
    name: "Alex Thompson",
    avatar: "/professional-woman.png",
    position: "Senior Frontend Developer",
    department: "Engineering",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js"],
    status: "interview",
    stage: "Technical Interview",
    appliedDate: "2024-12-08",
    source: "LinkedIn",
    rating: 4.5,
  },
  {
    id: "CND-002",
    name: "Maria Garcia",
    avatar: "/woman-designer.png",
    position: "UX Designer",
    department: "Design",
    experience: "3 years",
    skills: ["Figma", "User Research", "Prototyping"],
    status: "offer",
    stage: "Offer Extended",
    appliedDate: "2024-12-05",
    source: "Company Website",
    rating: 4.8,
  },
  {
    id: "CND-003",
    name: "James Wilson",
    avatar: "/professional-man.png",
    position: "Marketing Manager",
    department: "Marketing",
    experience: "7 years",
    skills: ["Digital Marketing", "Analytics", "Strategy"],
    status: "screening",
    stage: "Phone Screening",
    appliedDate: "2024-12-10",
    source: "Indeed",
    rating: 4.2,
  },
  {
    id: "CND-004",
    name: "Sophie Chen",
    avatar: "/woman-marketing.png",
    position: "Data Scientist",
    department: "Engineering",
    experience: "4 years",
    skills: ["Python", "Machine Learning", "SQL"],
    status: "rejected",
    stage: "Application Review",
    appliedDate: "2024-12-03",
    source: "Referral",
    rating: 3.8,
  },
  {
    id: "CND-005",
    name: "Robert Kim",
    avatar: "/man-engineer.png",
    position: "DevOps Engineer",
    department: "Engineering",
    experience: "6 years",
    skills: ["AWS", "Docker", "Kubernetes"],
    status: "hired",
    stage: "Onboarding",
    appliedDate: "2024-11-28",
    source: "Glassdoor",
    rating: 4.9,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "hired":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "offer":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "interview":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "screening":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getRatingStars = (rating: number) => {
  return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
}

export function RecruitmentPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {recruitmentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {index === 0 && <Target className="h-4 w-4" />}
                {index === 1 && <Users className="h-4 w-4" />}
                {index === 2 && <Clock className="h-4 w-4" />}
                {index === 3 && <UserCheck className="h-4 w-4" />}
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
          <h2 className="text-2xl font-bold tracking-tight">Recruitment</h2>
          <p className="text-muted-foreground">Manage candidates and hiring pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Job Postings
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidate.position}</div>
                      <div className="text-sm text-muted-foreground">{candidate.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{candidate.stage}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">{getRatingStars(candidate.rating)}</span>
                      <span className="text-sm text-muted-foreground">({candidate.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.source}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
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
