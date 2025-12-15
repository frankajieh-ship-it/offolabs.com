'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLaunchById } from '@/lib/data/launch-demo';
import type { Launch } from '@/lib/types/launch';
import PermitCard from '@/components/launch/PermitCard';
import MobilePermitView from '@/components/launch/MobilePermitView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ArrowLeft, Plus, LayoutGrid } from 'lucide-react';

export default function PermitsPage() {
  const params = useParams();
  const router = useRouter();
  const launchId = params.launchId as string;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const launchData = getLaunchById(launchId);
    if (!launchData) {
      router.push('/launch');
      return;
    }
    setLaunch(launchData);
  }, [launchId, router]);

  if (!mounted || !launch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading permits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile ? (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <Link
            href={`/launch/${launchId}`}
            className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Launch
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Permits</h1>
              <p className="text-xs text-gray-600">{launch.permits.length} total</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Header */
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href={`/launch/${launchId}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Launch
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <LayoutGrid className="w-6 h-6 text-gray-600" />
                  <h1 className="text-3xl font-bold text-gray-900">Permits & Inspections</h1>
                </div>
                <p className="text-gray-600">
                  {launch.name} · {launch.permits.length} permits tracked
                </p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                <Plus className="w-4 h-4" />
                Add Permit
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={isMobile ? 'p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {isMobile ? (
          <MobilePermitView launch={launch} />
        ) : (
          <div className="space-y-4">
            {launch.permits.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <LayoutGrid className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Permits Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Add permits to track for this launch
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add First Permit
                </button>
              </div>
            ) : (
              launch.permits.map(permit => (
                <PermitCard key={permit.id} permit={permit} />
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer - Desktop Only */}
      {!isMobile && (
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
      )}
    </div>
  );
}
