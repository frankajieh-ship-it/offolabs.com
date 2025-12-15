'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLaunches } from '@/lib/data/launch-demo';
import type { Launch } from '@/lib/types/launch';
import { Calendar, MapPin, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import DemoModeBanner from '@/components/launch/DemoModeBanner';

export default function LaunchDashboard() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLaunches(getLaunches());
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getReadinessIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5" />;
    if (score >= 60) return <TrendingUp className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  const getDaysUntilOpen = (targetDate: Date) => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPermitSummary = (launch: Launch) => {
    const total = launch.permits.length;
    const approved = launch.permits.filter(p => p.status === 'approved').length;
    const critical = launch.permits.filter(p => p.priority === 'critical' && p.status !== 'approved').length;

    return { total, approved, critical };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">OFFO Launch™</h1>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  NEW
                </span>
              </div>
              <p className="text-gray-600">
                Permit & Inspection Intelligence for Site Launches
              </p>
            </div>
            <Link
              href="/launch/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              + New Launch
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {launches.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Launches Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first launch to start tracking permits and inspections
              </p>
              <Link
                href="/launch/new"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Launch
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {launches.map((launch) => {
              const daysUntil = getDaysUntilOpen(launch.targetOpenDate);
              const { total, approved, critical } = getPermitSummary(launch);

              return (
                <Link
                  key={launch.id}
                  href={`/launch/${launch.id}`}
                  className="block bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {launch.name}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {launch.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Target: {launch.targetOpenDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Readiness Score Badge */}
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getReadinessColor(launch.readinessScore)}`}>
                        {getReadinessIcon(launch.readinessScore)}
                        <div className="text-right">
                          <div className="text-2xl font-bold">{launch.readinessScore}</div>
                          <div className="text-xs font-medium">Readiness</div>
                        </div>
                      </div>
                    </div>

                    {/* Status Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Days Until Open */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Days Until Open</div>
                        <div className={`text-2xl font-bold ${daysUntil < 30 ? 'text-orange-600' : 'text-gray-900'}`}>
                          {daysUntil}
                        </div>
                      </div>

                      {/* Permits Progress */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Permits Approved</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {approved} / {total}
                        </div>
                      </div>

                      {/* Critical Permits */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Critical Pending</div>
                        <div className={`text-2xl font-bold ${critical > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {critical}
                        </div>
                      </div>

                      {/* Launch Type */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Type</div>
                        <div className="text-lg font-semibold text-gray-900 capitalize">
                          {launch.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                MVP Demo Mode
              </h3>
              <p className="text-sm text-blue-800">
                This is a demonstration of OFFO Launch™. Data is stored locally in your browser.
                Production version will sync with your compliance systems and regulatory databases.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Demo Mode Banner */}
      <DemoModeBanner />
    </div>
  );
}
