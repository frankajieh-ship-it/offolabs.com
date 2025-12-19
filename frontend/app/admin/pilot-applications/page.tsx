'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Download, Search, RefreshCw, Filter, LogOut } from 'lucide-react'

interface PilotApplication {
  id: string
  created_at: string
  company_name: string
  industry: string
  location_count: string
  team_size: string
  contact_name: string
  contact_email: string
  contact_role: string
  current_tools: string | null
  data_sources: string[]
  primary_challenge: string
  timeline: string
  status: string
  ip_hash: string | null
  user_agent: string | null
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  'on-hold': 'bg-gray-100 text-gray-800',
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'on-hold', label: 'On Hold' },
]

const industries = [
  'All Industries',
  'Restaurant / Food Service',
  'Medical Facility / Healthcare',
  'Manufacturing / Industrial',
  'Multi-unit Retail / Franchise',
  'Hospitality / Hotels',
  'Construction',
  'Field Services / Utilities',
  'Other'
]

export default function PilotApplicationsAdmin() {
  const router = useRouter()
  const [applications, setApplications] = useState<PilotApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('All Industries')
  const [selectedApp, setSelectedApp] = useState<PilotApplication | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check authentication status
  useEffect(() => {
    checkAuth()
  }, [])

  // Fetch applications when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications()
    }
  }, [statusFilter, industryFilter, isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/check')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (industryFilter !== 'All Industries') params.append('industry', industryFilter)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/admin/pilot-applications?${params}`)
      const data = await response.json()

      if (response.ok) {
        setApplications(data.applications)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchApplications()
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/pilot-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setApplications(apps =>
          apps.map(app => app.id === id ? { ...app, status: newStatus } : app)
        )
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus })
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Company',
      'Industry',
      'Locations',
      'Team Size',
      'Contact Name',
      'Email',
      'Role',
      'Timeline',
      'Status',
      'Challenge'
    ]

    const rows = applications.map(app => [
      new Date(app.created_at).toLocaleDateString(),
      app.company_name,
      app.industry,
      app.location_count,
      app.team_size,
      app.contact_name,
      app.contact_email,
      app.contact_role,
      app.timeline,
      app.status,
      app.primary_challenge.replace(/,/g, ';'), // Escape commas
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pilot-applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-offo-blue-700"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilot Applications</h1>
            <p className="text-gray-600">Manage and review pilot program applications</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by company, contact, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Industry Filter */}
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSearch} variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button onClick={fetchApplications} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={exportToCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
          </div>
          {statusOptions.slice(1).map(status => (
            <div key={status.value} className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-600">{status.label}</div>
              <div className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === status.value).length}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No applications found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.company_name}</div>
                        <div className="text-sm text-gray-500">{app.location_count}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.contact_name}</div>
                        <div className="text-sm text-gray-500">{app.contact_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.timeline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Select
                          value={app.status}
                          onValueChange={(value) => updateStatus(app.id, value)}
                        >
                          <SelectTrigger className="w-32" onClick={(e) => e.stopPropagation()}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.slice(1).map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedApp && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedApp(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedApp.company_name}</h2>
                    <p className="text-gray-600">{selectedApp.industry}</p>
                  </div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Company Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Industry:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.industry}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Locations:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.location_count}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Team Size:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.team_size}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.contact_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.contact_email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Role:</span>
                        <span className="ml-2 text-gray-900">{selectedApp.contact_role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Current Tools</h3>
                    <p className="text-sm text-gray-900">{selectedApp.current_tools || 'None specified'}</p>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Data Sources</h3>
                    <ul className="list-disc list-inside text-sm text-gray-900">
                      {selectedApp.data_sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Primary Challenge</h3>
                    <p className="text-sm text-gray-900">{selectedApp.primary_challenge}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-sm text-gray-900">{selectedApp.timeline}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                    <Select
                      value={selectedApp.status}
                      onValueChange={(value) => updateStatus(selectedApp.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.slice(1).map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Metadata</h3>
                    <div className="text-sm text-gray-600">
                      Submitted: {new Date(selectedApp.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
