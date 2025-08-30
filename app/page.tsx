"use client"

import { useState } from "react"
import { CRMLayout } from "@/components/crm-layout"
import { DashboardPage } from "@/components/pages/dashboard"
import { ProjectsPage } from "@/components/pages/projects"
import { CalendarPage } from "@/components/pages/calendar"
import { EmployeesPage } from "@/components/pages/employees"
import { PerformancePage } from "@/components/pages/performance"
import { InvoicesPage } from "@/components/pages/invoices"
import { PayrollsPage } from "@/components/pages/payrolls"
import { LeaveManagementPage } from "@/components/pages/leave-management"
import { RecruitmentPage } from "@/components/pages/recruitment"
import { NotificationsPage } from "@/components/pages/notifications"
import { SettingsPage } from "@/components/pages/settings"
import { HelpCenterPage } from "@/components/pages/help-center"
import { OrdersPage } from "@/components/pages/orders"
import { SalesPage } from "@/components/pages/sales"
import type { JSX } from "react/jsx-runtime"

// Add more placeholder pages
const pageComponents: Record<string, () => JSX.Element> = {
  dashboard: () => <DashboardPage />,
  projects: () => <ProjectsPage />,
  calendar: () => <CalendarPage />,
  orders: () => <OrdersPage />,
  sales: () => <SalesPage />,
  employees: () => <EmployeesPage />,
  performance: () => <PerformancePage />,
  invoices: () => <InvoicesPage />,
  payrolls: () => <PayrollsPage />,
  "leave-management": () => <LeaveManagementPage />,
  recruitment: () => <RecruitmentPage />,
  notifications: () => <NotificationsPage />,
  settings: () => <SettingsPage />,
  "help-center": () => <HelpCenterPage />,
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const PageComponent = pageComponents[currentPage] || (() => <DashboardPage />)

  return (
    <CRMLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      <PageComponent />
    </CRMLayout>
  )
}
