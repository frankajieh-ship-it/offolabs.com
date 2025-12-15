'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 max-w-sm shadow-lg z-50">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" size={18} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-yellow-800">MVP Demo Mode</p>
            <button
              onClick={() => setIsVisible(false)}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-yellow-600">
            This is a demonstration of OFFO Launch™. Data is stored locally in your browser.
            Production version will sync with your compliance systems and regulatory databases.
          </p>
        </div>
      </div>
    </div>
  );
}
