"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface SortOption {
  label: string
  value: string
}

interface DataTableFiltersProps {
  searchPlaceholder?: string
  searchValue: string
  onSearchChange: (value: string) => void
  filterGroups?: {
    label: string
    key: string
    options: FilterOption[]
    selectedValues: string[]
    onSelectionChange: (values: string[]) => void
  }[]
  sortOptions?: SortOption[]
  sortValue?: string
  sortDirection?: "asc" | "desc"
  onSortChange?: (value: string, direction: "asc" | "desc") => void
  activeFiltersCount?: number
  onClearFilters?: () => void
}

export function DataTableFilters({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filterGroups = [],
  sortOptions = [],
  sortValue,
  sortDirection = "asc",
  onSortChange,
  activeFiltersCount = 0,
  onClearFilters,
}: DataTableFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const getSortIcon = () => {
    if (!sortValue) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-muted border-border"
          />
        </div>

        {/* Filter Dropdown */}
        {filterGroups.length > 0 && (
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent relative">
                <Filter className="h-4 w-4" />
                Filter
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {filterGroups.map((group, groupIndex) => (
                <div key={group.key}>
                  <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                  {group.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={group.selectedValues.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const newValues = checked
                          ? [...group.selectedValues, option.value]
                          : group.selectedValues.filter((v) => v !== option.value)
                        group.onSelectionChange(newValues)
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                          <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                            {option.count}
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                  {groupIndex < filterGroups.length - 1 && <DropdownMenuSeparator />}
                </div>
              ))}
              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="ghost" size="sm" onClick={onClearFilters} className="w-full justify-center gap-2">
                      <X className="h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Sort Dropdown */}
        {sortOptions.length > 0 && (
          <Select
            value={sortValue ? `${sortValue}-${sortDirection}` : ""}
            onValueChange={(value) => {
              if (!value) return
              const [sortKey, direction] = value.split("-")
              onSortChange?.(sortKey, direction as "asc" | "desc")
            }}
          >
            <SelectTrigger className="w-[180px] bg-transparent">
              <div className="flex items-center gap-2">
                {getSortIcon()}
                <SelectValue placeholder="Sort by..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <div key={option.value}>
                  <SelectItem value={`${option.value}-asc`}>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      {option.label} (A-Z)
                    </div>
                  </SelectItem>
                  <SelectItem value={`${option.value}-desc`}>
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4" />
                      {option.label} (Z-A)
                    </div>
                  </SelectItem>
                </div>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
          </span>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
