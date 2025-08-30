"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Bell, Check, Settings, Mail, MessageSquare, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

// Mock data
const notifications = [
  {
    id: "NOT-001",
    type: "leave_request",
    title: "New Leave Request",
    message: "Sarah Johnson has requested 6 days of annual leave from Dec 20-27",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    avatar: "/professional-woman.png",
    actionRequired: true,
  },
  {
    id: "NOT-002",
    type: "payroll",
    title: "Payroll Processing Complete",
    message: "December payroll has been processed for 156 employees",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
    avatar: null,
    actionRequired: false,
  },
  {
    id: "NOT-003",
    type: "recruitment",
    title: "Interview Scheduled",
    message: "Technical interview scheduled with Alex Thompson for Senior Frontend Developer position",
    timestamp: "3 hours ago",
    read: true,
    priority: "medium",
    avatar: "/professional-man.png",
    actionRequired: false,
  },
  {
    id: "NOT-004",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM - 4:00 AM EST",
    timestamp: "5 hours ago",
    read: true,
    priority: "low",
    avatar: null,
    actionRequired: false,
  },
  {
    id: "NOT-005",
    type: "performance",
    title: "Performance Review Due",
    message: "Q4 performance reviews are due by December 31st",
    timestamp: "1 day ago",
    read: false,
    priority: "high",
    avatar: null,
    actionRequired: true,
  },
  {
    id: "NOT-006",
    type: "project",
    title: "Project Milestone Reached",
    message: "Website Redesign project has reached 75% completion",
    timestamp: "2 days ago",
    read: true,
    priority: "medium",
    avatar: null,
    actionRequired: false,
  },
]

const notificationSettings = [
  { id: "email", label: "Email Notifications", description: "Receive notifications via email", enabled: true },
  { id: "push", label: "Push Notifications", description: "Receive browser push notifications", enabled: true },
  {
    id: "leave",
    label: "Leave Requests",
    description: "Notifications for leave requests and approvals",
    enabled: true,
  },
  { id: "payroll", label: "Payroll Updates", description: "Notifications for payroll processing", enabled: true },
  { id: "recruitment", label: "Recruitment", description: "Notifications for candidate updates", enabled: false },
  {
    id: "system",
    label: "System Updates",
    description: "Notifications for system maintenance and updates",
    enabled: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "leave_request":
      return <Calendar className="h-4 w-4" />
    case "payroll":
      return <Mail className="h-4 w-4" />
    case "recruitment":
      return <MessageSquare className="h-4 w-4" />
    case "system":
      return <Settings className="h-4 w-4" />
    case "performance":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "low":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "unread" | "settings">("all")
  const [notificationList, setNotificationList] = useState(notifications)
  const [settings, setSettings] = useState(notificationSettings)
  const [actionModal, setActionModal] = useState<{ open: boolean; notification: any }>({
    open: false,
    notification: null,
  })

  const unreadCount = notificationList.filter((n) => !n.read).length
  const filteredNotifications = selectedTab === "unread" ? notificationList.filter((n) => !n.read) : notificationList

  const markAsRead = (id: string) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const toggleSetting = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const handleTakeAction = (notification: any) => {
    setActionModal({ open: true, notification })
  }

  const processAction = (action: string) => {
    const { notification } = actionModal

    setNotificationList((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, actionRequired: false, read: true } : n)),
    )

    setActionModal({ open: false, notification: null })

    alert(`Action "${action}" completed for: ${notification.title}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with system alerts and updates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setSelectedTab("all")}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            selectedTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setSelectedTab("unread")}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            selectedTab === "unread"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <Badge variant="secondary" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </button>
        <button
          onClick={() => setSelectedTab("settings")}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            selectedTab === "settings"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Settings
        </button>
      </div>

      {/* Content */}
      {selectedTab === "settings" ? (
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">{setting.label}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground text-center">
                  {selectedTab === "unread"
                    ? "All caught up! No unread notifications."
                    : "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`transition-colors ${!notification.read ? "bg-muted/30" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {notification.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {notification.title
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        <div className="flex items-center gap-2">
                          {notification.actionRequired && (
                            <Button size="sm" variant="outline" onClick={() => handleTakeAction(notification)}>
                              Take Action
                            </Button>
                          )}
                          {!notification.read && (
                            <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Action Modal */}
      <Dialog open={actionModal.open} onOpenChange={(open) => setActionModal({ open, notification: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Take Action</DialogTitle>
          </DialogHeader>
          {actionModal.notification && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium">{actionModal.notification.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{actionModal.notification.message}</p>
              </div>

              {actionModal.notification.type === "leave_request" && (
                <div className="space-y-2">
                  <p className="text-sm">Choose an action for this leave request:</p>
                  <div className="flex gap-2">
                    <Button onClick={() => processAction("Approve")} className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button onClick={() => processAction("Reject")} variant="outline" className="flex-1">
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              {actionModal.notification.type === "performance" && (
                <div className="space-y-2">
                  <p className="text-sm">Performance review action:</p>
                  <Button onClick={() => processAction("Start Review")} className="w-full">
                    Start Review Process
                  </Button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ open: false, notification: null })}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
