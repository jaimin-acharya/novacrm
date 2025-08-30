"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for events
const eventsData = [
  {
    id: 1,
    title: "Team Standup",
    type: "meeting",
    date: "2024-01-15",
    time: "09:00",
    duration: "30 min",
    location: "Conference Room A",
    attendees: [
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
      { name: "Michael Chen", avatar: "/professional-man.png" },
    ],
  },
  {
    id: 2,
    title: "Project Review",
    type: "review",
    date: "2024-01-15",
    time: "14:00",
    duration: "1 hour",
    location: "Virtual",
    attendees: [
      { name: "Emily Rodriguez", avatar: "/woman-designer.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
    ],
  },
  {
    id: 3,
    title: "Client Presentation",
    type: "presentation",
    date: "2024-01-16",
    time: "10:00",
    duration: "2 hours",
    location: "Client Office",
    attendees: [
      { name: "Lisa Thompson", avatar: "/woman-marketing.png" },
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
    ],
  },
  {
    id: 4,
    title: "Design Workshop",
    type: "workshop",
    date: "2024-01-17",
    time: "13:00",
    duration: "3 hours",
    location: "Design Studio",
    attendees: [{ name: "Emily Rodriguez", avatar: "/woman-designer.png" }],
  },
  {
    id: 5,
    title: "Sprint Planning",
    type: "planning",
    date: "2024-01-18",
    time: "09:30",
    duration: "2 hours",
    location: "Conference Room B",
    attendees: [
      { name: "Michael Chen", avatar: "/professional-man.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
    ],
  },
  {
    id: 6,
    title: "All Hands Meeting",
    type: "meeting",
    date: "2024-01-19",
    time: "15:00",
    duration: "1 hour",
    location: "Main Auditorium",
    attendees: [
      { name: "Sarah Johnson", avatar: "/professional-woman.png" },
      { name: "Michael Chen", avatar: "/professional-man.png" },
      { name: "Emily Rodriguez", avatar: "/woman-designer.png" },
      { name: "David Kim", avatar: "/man-engineer.png" },
      { name: "Lisa Thompson", avatar: "/woman-marketing.png" },
    ],
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "meeting":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "review":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "presentation":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "workshop":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "planning":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // January 15, 2024
  const today = new Date(2024, 0, 15) // Mock today as January 15, 2024

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0 - (startingDayOfWeek - 1 - i))
      days.push({
        date: prevMonthDay,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day)
      const isToday = dayDate.toDateString() === today.toDateString()
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        isToday,
      })
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonthDay = new Date(year, month + 1, day)
      days.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return eventsData.filter((event) => event.date === dateString)
  }

  const getTodaysEvents = () => {
    const todayString = today.toISOString().split("T")[0]
    return eventsData.filter((event) => event.date === todayString)
  }

  const getUpcomingEvents = () => {
    const todayString = today.toISOString().split("T")[0]
    return eventsData
      .filter((event) => event.date > todayString)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-0">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b border-border">
              {dayNames.map((day) => (
                <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.date)
                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[120px] border-r border-b border-border p-2 hover:bg-muted transition-colors",
                      !day.isCurrentMonth && "bg-muted/50",
                      day.isToday && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-medium mb-1",
                        !day.isCurrentMonth && "text-muted-foreground",
                        day.isToday && "text-primary-foreground",
                      )}
                    >
                      {day.date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn("text-xs p-1 rounded truncate", getEventTypeColor(event.type))}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Sidebar */}
      <div className="space-y-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today's Events
            </CardTitle>
            <CardDescription>
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getTodaysEvents().length === 0 ? (
              <p className="text-sm text-muted-foreground">No events scheduled for today</p>
            ) : (
              getTodaysEvents().map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <div className="text-xs font-medium">{event.time}</div>
                    <div className="text-xs text-muted-foreground">{event.duration}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">{event.title}</h4>
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex -space-x-1">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {event.attendees.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +{event.attendees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Next 5 scheduled events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getUpcomingEvents().length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming events</p>
            ) : (
              getUpcomingEvents().map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <div className="text-xs font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs text-muted-foreground">{event.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">{event.title}</h4>
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1">
                        {event.attendees.slice(0, 2).map((attendee, index) => (
                          <Avatar key={index} className="h-5 w-5 border border-background">
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {attendee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {event.attendees.length > 2 && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-muted text-xs">
                            +{event.attendees.length - 2}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{event.duration}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
