'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLaunches, saveLaunches } from '@/lib/data/launch-demo';
import type { Launch, Permit, LaunchType, PermitType, PermitPriority } from '@/lib/types/launch';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Building2,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PermitFormData {
  id: string;
  type: PermitType;
  title: string;
  description: string;
  priority: PermitPriority;
  estimatedProcessingDays: number;
  agency: string;
  applicationDeadline?: string;
  inspectionDate?: string;
}

export default function NewLaunchPage() {
  const router = useRouter();

  // Launch form data
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState<LaunchType>('restaurant');
  const [targetOpenDate, setTargetOpenDate] = useState('');

  // Permits
  const [permits, setPermits] = useState<PermitFormData[]>([]);
  const [showPermitForm, setShowPermitForm] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const permitTypeOptions: { value: PermitType; label: string }[] = [
    { value: 'health', label: 'Health Department' },
    { value: 'fire', label: 'Fire Safety' },
    { value: 'ada', label: 'ADA Compliance' },
    { value: 'license', label: 'Business License' },
    { value: 'zoning', label: 'Zoning' },
    { value: 'building', label: 'Building/Occupancy' }
  ];

  const priorityOptions: { value: PermitPriority; label: string; color: string }[] = [
    { value: 'critical', label: 'Critical', color: 'text-red-700' },
    { value: 'high', label: 'High', color: 'text-orange-700' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-700' },
    { value: 'low', label: 'Low', color: 'text-gray-700' }
  ];

  const launchTypeOptions: { value: LaunchType; label: string }[] = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'retail', label: 'Retail' },
    { value: 'medical', label: 'Medical' },
    { value: 'fitness', label: 'Fitness' }
  ];

  const addPermit = () => {
    const newPermit: PermitFormData = {
      id: `temp_${Date.now()}`,
      type: 'health',
      title: '',
      description: '',
      priority: 'high',
      estimatedProcessingDays: 14,
      agency: ''
    };
    setPermits([...permits, newPermit]);
    setShowPermitForm(true);
  };

  const removePermit = (id: string) => {
    setPermits(permits.filter(p => p.id !== id));
  };

  const updatePermit = (id: string, field: keyof PermitFormData, value: any) => {
    setPermits(permits.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Launch name is required';
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!targetOpenDate) {
      newErrors.targetOpenDate = 'Target open date is required';
    }

    // Validate permits
    permits.forEach((permit, index) => {
      if (!permit.title.trim()) {
        newErrors[`permit_title_${index}`] = 'Permit title is required';
      }
      if (!permit.agency.trim()) {
        newErrors[`permit_agency_${index}`] = 'Agency is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const launches = getLaunches();
      const newLaunchId = `launch_${Date.now()}`;
      const now = new Date();

      // Convert permits to proper format
      const newPermits: Permit[] = permits.map(p => ({
        id: `permit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        launchId: newLaunchId,
        type: p.type,
        title: p.title,
        description: p.description || undefined,
        status: 'not_started',
        statusUpdatedAt: now,
        createdAt: now,
        applicationDeadline: p.applicationDeadline ? new Date(p.applicationDeadline) : undefined,
        inspectionDate: p.inspectionDate ? new Date(p.inspectionDate) : undefined,
        agency: p.agency || undefined,
        priority: p.priority,
        estimatedProcessingDays: p.estimatedProcessingDays,
        inspectorNotes: [],
        correctiveActions: []
      }));

      // Group permits by type
      const permitsByType = {
        health: newPermits.filter(p => p.type === 'health'),
        fire: newPermits.filter(p => p.type === 'fire'),
        ada: newPermits.filter(p => p.type === 'ada'),
        license: newPermits.filter(p => p.type === 'license'),
        zoning: newPermits.filter(p => p.type === 'zoning'),
        building: newPermits.filter(p => p.type === 'building')
      };

      // Calculate initial readiness score
      const readinessScore = 0; // New launch starts at 0

      const newLaunch: Launch = {
        id: newLaunchId,
        name: name.trim(),
        location: location.trim(),
        address: address.trim(),
        type,
        targetOpenDate: new Date(targetOpenDate),
        createdAt: now,
        readinessScore,
        permits: newPermits,
        permitsByType
      };

      // Save to localStorage
      saveLaunches([...launches, newLaunch]);

      // Redirect to the new launch detail page
      router.push(`/launch/${newLaunchId}`);
    } catch (error) {
      console.error('Failed to create launch:', error);
      setErrors({ submit: 'Failed to create launch. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const getPermitTypeLabel = (type: PermitType) => {
    return permitTypeOptions.find(opt => opt.value === type)?.label || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Launches
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Launch</h1>
              <p className="text-sm text-gray-600 mt-1">
                Set up a new site launch and track permits & inspections
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Launch Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Launch Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Ember & Oak Restaurant"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Location & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Downtown San Francisco"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Launch Type *
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as LaunchType)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {launchTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Address *
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 245 Market Street, San Francisco, CA 94105"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Target Open Date */}
              <div>
                <label htmlFor="targetOpenDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Opening Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    id="targetOpenDate"
                    value={targetOpenDate}
                    onChange={(e) => setTargetOpenDate(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.targetOpenDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.targetOpenDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.targetOpenDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Permits Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-600" />
                Permits & Inspections
              </h2>
              <button
                type="button"
                onClick={addPermit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Permit
              </button>
            </div>

            {permits.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Permits Added Yet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add permits and inspections to track for this launch
                </p>
                <button
                  type="button"
                  onClick={addPermit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add First Permit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {permits.map((permit, index) => (
                  <div key={permit.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-700">
                        Permit #{index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removePermit(permit.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Permit Type */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Type *
                        </label>
                        <select
                          value={permit.type}
                          onChange={(e) => updatePermit(permit.id, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {permitTypeOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Priority */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Priority *
                        </label>
                        <select
                          value={permit.priority}
                          onChange={(e) => updatePermit(permit.id, 'priority', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {priorityOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Title */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={permit.title}
                          onChange={(e) => updatePermit(permit.id, 'title', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors[`permit_title_${index}`] ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder={`e.g., ${getPermitTypeLabel(permit.type)} Permit`}
                        />
                        {errors[`permit_title_${index}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`permit_title_${index}`]}</p>
                        )}
                      </div>

                      {/* Agency */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Agency *
                        </label>
                        <input
                          type="text"
                          value={permit.agency}
                          onChange={(e) => updatePermit(permit.id, 'agency', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors[`permit_agency_${index}`] ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder="e.g., County Health Department"
                        />
                        {errors[`permit_agency_${index}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`permit_agency_${index}`]}</p>
                        )}
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Description (Optional)
                        </label>
                        <textarea
                          value={permit.description}
                          onChange={(e) => updatePermit(permit.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          placeholder="Brief description of permit requirements..."
                        />
                      </div>

                      {/* Processing Days */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Est. Processing Days
                        </label>
                        <input
                          type="number"
                          value={permit.estimatedProcessingDays}
                          onChange={(e) => updatePermit(permit.id, 'estimatedProcessingDays', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>

                      {/* Application Deadline */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Application Deadline (Optional)
                        </label>
                        <input
                          type="date"
                          value={permit.applicationDeadline || ''}
                          onChange={(e) => updatePermit(permit.id, 'applicationDeadline', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/launch"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Launch'}
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-300 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600">
              © 2025 <span className="font-semibold">OFFO LAB</span>
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 font-medium">
              Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Launch Intelligence · v1.0
            </p>
            <p className="text-xs text-red-600 font-semibold mt-1">
              Confidential
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
