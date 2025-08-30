"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Calendar,
  FolderOpen,
  Settings,
  Bell,
  HelpCircle,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  UserPlus,
  PlaneTakeoff,
  Search,
  Mail,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Brand configuration - easy to customize
const BRAND_CONFIG = {
  name: "NovaCRM",
  initial: "N",
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "orders", label: "Orders", icon: FileText },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "leave-management", label: "Leave Management", icon: PlaneTakeoff },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "help-center", label: "Help Center", icon: HelpCircle },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "payrolls", label: "Payrolls", icon: DollarSign },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "employees", label: "Employees", icon: Users },
  { id: "recruitment", label: "Recruitment", icon: UserPlus },
]

interface CRMLayoutProps {
  children: React.ReactNode
  currentPage?: string
  onPageChange?: (pageId: string) => void
}

export function CRMLayout({ children, currentPage = "dashboard", onPageChange }: CRMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector('input[aria-label="Search content"]') as HTMLInputElement
        searchInput?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleMenuClick = (pageId: string) => {
    onPageChange?.(pageId)
    setSidebarOpen(false)
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-in fade-in-0 duration-200"
            onClick={() => setSidebarOpen(false)}
            role="button"
            aria-label="Close sidebar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSidebarOpen(false)
              }
            }}
          />
        )}

        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-full w-72 sm:w-64 transform bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out md:relative md:translate-x-0 shadow-xl md:shadow-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Main navigation"
          role="navigation"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 border-b border-sidebar-border px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold transition-transform duration-200 hover:scale-110">
                {BRAND_CONFIG.initial}
              </div>
              <span className="text-base sm:text-lg font-semibold text-sidebar-foreground truncate">
                {BRAND_CONFIG.name}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto md:hidden transition-colors duration-200 shrink-0"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Close sidebar</TooltipContent>
              </Tooltip>
            </div>

            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-sidebar-accent border-sidebar-border placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-sidebar-primary/20 text-sm"
                  aria-label="Search navigation"
                />
              </div>
            </div>

            <nav className="flex-1 px-3 sm:px-4 pb-4 overflow-y-auto">
              <ul className="space-y-1" role="list">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id

                  return (
                    <li key={item.id} role="listitem">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleMenuClick(item.id)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-3 sm:py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] sm:min-h-[36px]",
                              isActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <Icon className="h-4 w-4 transition-transform duration-200 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      </Tooltip>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center gap-2 sm:gap-4 border-b border-border bg-card px-3 sm:px-6 py-3 sm:py-4 shadow-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  Open sidebar
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ⌘B
                  </kbd>
                </div>
              </TooltipContent>
            </Tooltip>

            <h1 className="text-lg sm:text-xl font-semibold text-foreground capitalize animate-in slide-in-from-left-2 duration-300 truncate flex-1 sm:flex-none">
              {currentPage.replace("-", " ")}
            </h1>

            <div className="hidden lg:flex items-center gap-1 ml-8">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground transition-all duration-200 hover:scale-105"
              >
                Overview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground transition-all duration-200 hover:scale-105"
              >
                Orders
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground transition-all duration-200 hover:scale-105"
              >
                Sales
              </Button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
                    onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                    aria-label="Toggle search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>

              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 bg-muted border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  aria-label="Search content"
                />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Messages"
                    className="transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Messages</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                    <div
                      className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications (3 new)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 transition-all duration-200 hover:scale-110 cursor-pointer">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Profile settings</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    className="hidden sm:flex transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Invite
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Invite team members</TooltipContent>
              </Tooltip>
            </div>
          </header>

          {mobileSearchOpen && (
            <div className="md:hidden border-b border-border bg-card px-3 py-2 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 bg-muted border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  aria-label="Mobile search"
                  autoFocus
                />
              </div>
            </div>
          )}

          <main
            className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            role="main"
          >
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
