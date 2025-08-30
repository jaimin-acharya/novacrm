"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building, Bell, Shield, Palette, Check, AlertCircle } from "lucide-react"
import { validateForm, PROFILE_SCHEMA, COMPANY_SCHEMA } from "@/lib/validation"

export function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@novacrm.com",
    title: "CRM Administrator",
    department: "IT",
    phone: "+1 (555) 123-4567",
    bio: "Experienced CRM administrator with 8+ years in system management and user support.",
  })

  const [company, setCompany] = useState({
    name: "NovaCRM Inc.",
    address: "123 Business Ave, Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
    website: "https://novacrm.com",
    industry: "Technology",
  })

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAlerts: true,
  })

  const [saveStates, setSaveStates] = useState<Record<string, boolean>>({})
  const [successMessages, setSuccessMessages] = useState<Record<string, boolean>>({})
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})
  const [companyErrors, setCompanyErrors] = useState<Record<string, string>>({})
  const [profileTouched, setProfileTouched] = useState<Record<string, boolean>>({})
  const [companyTouched, setCompanyTouched] = useState<Record<string, boolean>>({})

  // Real-time validation for profile
  useEffect(() => {
    const errors = validateForm(profile, PROFILE_SCHEMA)
    setProfileErrors(errors)
  }, [profile])

  // Real-time validation for company
  useEffect(() => {
    const errors = validateForm(company, COMPANY_SCHEMA)
    setCompanyErrors(errors)
  }, [company])

  const handleSave = async (formType: string, data: any) => {
    setSaveStates((prev) => ({ ...prev, [formType]: true }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaveStates((prev) => ({ ...prev, [formType]: false }))
      setSuccessMessages((prev) => ({ ...prev, [formType]: true }))

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessages((prev) => ({ ...prev, [formType]: false }))
      }, 3000)
    } catch (error) {
      setSaveStates((prev) => ({ ...prev, [formType]: false }))
      console.error("Error saving:", error)
    }
  }

  const handleProfileSave = () => {
    const errors = validateForm(profile, PROFILE_SCHEMA)
    setProfileErrors(errors)
    setProfileTouched(Object.keys(profile).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    if (Object.keys(errors).length === 0) {
      handleSave("profile", profile)
    }
  }

  const handleCompanySave = () => {
    const errors = validateForm(company, COMPANY_SCHEMA)
    setCompanyErrors(errors)
    setCompanyTouched(Object.keys(company).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    if (Object.keys(errors).length === 0) {
      handleSave("company", company)
    }
  }

  const handleProfileFieldChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    setProfileTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleCompanyFieldChange = (field: string, value: string) => {
    setCompany((prev) => ({ ...prev, [field]: value }))
    setCompanyTouched((prev) => ({ ...prev, [field]: true }))
  }

  const getProfileFieldError = (field: string) => {
    return profileTouched[field] && profileErrors[field] ? profileErrors[field] : null
  }

  const getCompanyFieldError = (field: string) => {
    return companyTouched[field] && companyErrors[field] ? companyErrors[field] : null
  }

  const isProfileValid = Object.keys(profileErrors).length === 0
  const isCompanyValid = Object.keys(companyErrors).length === 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleProfileFieldChange("name", e.target.value)}
                    className={getProfileFieldError("name") ? "border-destructive" : ""}
                  />
                  {getProfileFieldError("name") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getProfileFieldError("name")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileFieldChange("email", e.target.value)}
                    className={getProfileFieldError("email") ? "border-destructive" : ""}
                  />
                  {getProfileFieldError("email") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getProfileFieldError("email")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => handleProfileFieldChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={profile.department}
                    onValueChange={(value) => handleProfileFieldChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileFieldChange("phone", e.target.value)}
                    className={getProfileFieldError("phone") ? "border-destructive" : ""}
                  />
                  {getProfileFieldError("phone") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getProfileFieldError("phone")}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileFieldChange("bio", e.target.value)}
                  rows={3}
                  className={getProfileFieldError("bio") ? "border-destructive" : ""}
                />
                {getProfileFieldError("bio") && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {getProfileFieldError("bio")}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleProfileSave} disabled={saveStates.profile || !isProfileValid}>
                  {saveStates.profile ? "Saving..." : "Save Changes"}
                </Button>
                {successMessages.profile && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Profile updated successfully</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={company.name}
                    onChange={(e) => handleCompanyFieldChange("name", e.target.value)}
                    className={getCompanyFieldError("name") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("name") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("name")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={company.industry}
                    onValueChange={(value) => handleCompanyFieldChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={company.address}
                    onChange={(e) => handleCompanyFieldChange("address", e.target.value)}
                    className={getCompanyFieldError("address") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("address") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("address")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={company.city}
                    onChange={(e) => handleCompanyFieldChange("city", e.target.value)}
                    className={getCompanyFieldError("city") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("city") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("city")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={company.state}
                    onChange={(e) => handleCompanyFieldChange("state", e.target.value)}
                    className={getCompanyFieldError("state") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("state") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("state")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={company.zip}
                    onChange={(e) => handleCompanyFieldChange("zip", e.target.value)}
                    className={getCompanyFieldError("zip") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("zip") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("zip")}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={company.website}
                    onChange={(e) => handleCompanyFieldChange("website", e.target.value)}
                    className={getCompanyFieldError("website") ? "border-destructive" : ""}
                  />
                  {getCompanyFieldError("website") && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {getCompanyFieldError("website")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleCompanySave} disabled={saveStates.company || !isCompanyValid}>
                  {saveStates.company ? "Saving..." : "Save Changes"}
                </Button>
                {successMessages.company && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Company information updated successfully</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, dateFormat: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleSave("preferences", preferences)} disabled={saveStates.preferences}>
                  {saveStates.preferences ? "Saving..." : "Save Changes"}
                </Button>
                {successMessages.preferences && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Preferences updated successfully</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive browser push notifications</div>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">Receive weekly summary reports</div>
                  </div>
                  <Switch
                    checked={preferences.weeklyReports}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Marketing Emails</div>
                    <div className="text-sm text-muted-foreground">Receive product updates and marketing content</div>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleSave("notifications", preferences)} disabled={saveStates.notifications}>
                  {saveStates.notifications ? "Saving..." : "Save Changes"}
                </Button>
                {successMessages.notifications && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Notification preferences updated successfully</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, twoFactorEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Login Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified of new login attempts</div>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, loginAlerts: checked }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity((prev) => ({ ...prev, sessionTimeout: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) => setSecurity((prev) => ({ ...prev, passwordExpiry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline" className="ml-2 bg-transparent">
                  Download Backup Codes
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleSave("security", security)} disabled={saveStates.security}>
                  {saveStates.security ? "Saving..." : "Save Changes"}
                </Button>
                {successMessages.security && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Security settings updated successfully</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
