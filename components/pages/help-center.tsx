"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Book, MessageCircle, Video, FileText, ExternalLink, Star } from "lucide-react"

// Mock data
const popularArticles = [
  {
    id: "ART-001",
    title: "Getting Started with NovaCRM",
    description: "Learn the basics of navigating and using NovaCRM effectively",
    category: "Getting Started",
    readTime: "5 min read",
    views: 1247,
    helpful: 89,
  },
  {
    id: "ART-002",
    title: "Managing Employee Records",
    description: "Complete guide to adding, editing, and organizing employee information",
    category: "Employee Management",
    readTime: "8 min read",
    views: 892,
    helpful: 76,
  },
  {
    id: "ART-003",
    title: "Setting Up Payroll Processing",
    description: "Step-by-step instructions for configuring and running payroll",
    category: "Payroll",
    readTime: "12 min read",
    views: 654,
    helpful: 82,
  },
  {
    id: "ART-004",
    title: "Leave Request Workflow",
    description: "How to handle leave requests from submission to approval",
    category: "Leave Management",
    readTime: "6 min read",
    views: 543,
    helpful: 91,
  },
]

const videoTutorials = [
  {
    id: "VID-001",
    title: "NovaCRM Dashboard Overview",
    description: "A comprehensive walkthrough of the main dashboard features",
    duration: "8:32",
    thumbnail: "/dashboard-tutorial.png",
    views: 2341,
  },
  {
    id: "VID-002",
    title: "Creating and Managing Projects",
    description: "Learn how to set up projects and track their progress",
    duration: "12:15",
    thumbnail: "/project-management-tutorial.png",
    views: 1876,
  },
  {
    id: "VID-003",
    title: "Advanced Reporting Features",
    description: "Generate custom reports and analyze your data",
    duration: "15:42",
    thumbnail: "/reporting-tutorial.png",
    views: 1234,
  },
]

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page, or by going to Settings > Security > Change Password if you're already logged in.",
  },
  {
    question: "Can I export employee data?",
    answer:
      "Yes, you can export employee data from the Employees page by clicking the 'Export' button. You can choose from various formats including CSV, Excel, and PDF.",
  },
  {
    question: "How do I set up automated payroll processing?",
    answer:
      "Navigate to Payrolls > Settings and enable 'Automated Processing'. You can set the frequency, approval workflow, and notification preferences.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "NovaCRM supports all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.",
  },
  {
    question: "How do I add new users to the system?",
    answer:
      "Go to Settings > User Management and click 'Add User'. Fill in the required information and assign appropriate roles and permissions.",
  },
  {
    question: "Can I customize the dashboard?",
    answer:
      "Yes, you can customize your dashboard by clicking the 'Customize' button. You can add, remove, and rearrange widgets to suit your needs.",
  },
]

const supportTeam = [
  {
    name: "Sarah Johnson",
    role: "Senior Support Specialist",
    avatar: "/professional-woman.png",
    specialties: ["Employee Management", "Payroll"],
    rating: 4.9,
  },
  {
    name: "Michael Chen",
    role: "Technical Support Lead",
    avatar: "/professional-man.png",
    specialties: ["System Integration", "Troubleshooting"],
    rating: 4.8,
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Success Manager",
    avatar: "/woman-designer.png",
    specialties: ["Onboarding", "Training"],
    rating: 4.9,
  },
]

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
        <p className="text-muted-foreground text-lg">Find answers, tutorials, and get support</p>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Popular Articles</h3>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                All Articles
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="text-sm text-muted-foreground">{article.readTime}</div>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.views} views</span>
                      <span>{article.helpful}% found helpful</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Video Tutorials</h3>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                YouTube Channel
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videoTutorials.map((video) => (
                <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{video.description}</p>
                    <div className="text-sm text-muted-foreground">{video.views.toLocaleString()} views</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Support</h3>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@novacrm.com</div>
                    <div className="text-sm text-muted-foreground">Response time: 2-4 hours</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                    <div className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Available 24/7</div>
                    <Button size="sm">Start Chat</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportTeam.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{member.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
