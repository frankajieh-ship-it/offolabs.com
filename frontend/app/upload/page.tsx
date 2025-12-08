'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');

    try {
      // TODO: Implement actual API upload
      // For now, simulate upload
      console.log('[OFFO] Uploading file:', selectedFile.name);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setUploadStatus('success');

      // Reset after 3 seconds
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('[OFFO] Upload error:', error);
      setUploadStatus('error');
    }
  };

  const downloadExampleCSV = () => {
    // Create example CSV content
    const csvContent = `business_id,business_name,industry,staff_count,task_completion_rate,training_completion_rate,documentation_score
biz_001,Acme Manufacturing,Manufacturing,45,0.92,0.88,0.90
biz_002,Summit Logistics,Transportation,32,0.85,0.78,0.82
biz_003,Valley Construction,Construction,67,0.68,0.72,0.75`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'offo_example_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/" className="inline-block">
            <img
              src="/OFFO_LAB_logo.png"
              alt="OFFO LAB"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Upload Compliance Data
          </h1>
          <p className="text-xl text-green-100">
            Upload your compliance metrics via CSV for instant risk score calculation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Instructions Section */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">CSV Upload - Demo Mode</h2>
              <p className="text-sm text-gray-700 mb-3">
                This is a demonstration feature. CSV uploads will be processed for display purposes only.
                Full API integration is coming soon.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={downloadExampleCSV}
                  className="inline-flex items-center text-sm text-blue-600 font-semibold hover:text-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Example CSV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Data</h2>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            {selectedFile ? (
              <div>
                <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold text-gray-900 mb-2">File Selected</p>
                <p className="text-sm text-gray-600 mb-4">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div>
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Drag and drop your CSV file here
                </p>
                <p className="text-sm text-gray-600 mb-4">or</p>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    Browse Files
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Accepts CSV files only • Max size: 10MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={uploadStatus === 'uploading'}
                className="w-full px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {uploadStatus === 'uploading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : uploadStatus === 'success' ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Upload Successful!
                  </span>
                ) : (
                  'Upload and Process'
                )}
              </button>

              {uploadStatus === 'error' && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Upload failed. Please try again.
                </p>
              )}
            </div>
          )}
        </section>

        {/* CSV Format Guide */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Required CSV Format</h2>

          <p className="text-gray-700 mb-4">
            Your CSV file should include the following columns:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 px-4 font-bold text-gray-900">Column Name</th>
                  <th className="text-left py-2 px-4 font-bold text-gray-900">Description</th>
                  <th className="text-left py-2 px-4 font-bold text-gray-900">Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">business_id</td>
                  <td className="py-2 px-4 text-gray-700">Unique identifier</td>
                  <td className="py-2 px-4 text-gray-600">Text</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">business_name</td>
                  <td className="py-2 px-4 text-gray-700">Organization name</td>
                  <td className="py-2 px-4 text-gray-600">Text</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">industry</td>
                  <td className="py-2 px-4 text-gray-700">Industry sector</td>
                  <td className="py-2 px-4 text-gray-600">Text</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">staff_count</td>
                  <td className="py-2 px-4 text-gray-700">Number of employees</td>
                  <td className="py-2 px-4 text-gray-600">Integer</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">task_completion_rate</td>
                  <td className="py-2 px-4 text-gray-700">Task completion (40% weight)</td>
                  <td className="py-2 px-4 text-gray-600">0.0 - 1.0</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">training_completion_rate</td>
                  <td className="py-2 px-4 text-gray-700">Training completion (30% weight)</td>
                  <td className="py-2 px-4 text-gray-600">0.0 - 1.0</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-600">documentation_score</td>
                  <td className="py-2 px-4 text-gray-700">Documentation quality (30% weight)</td>
                  <td className="py-2 px-4 text-gray-600">0.0 - 1.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Need API Integration CTA */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need API Integration?
          </h2>
          <p className="text-xl text-purple-100 mb-6">
            Connect your compliance database directly to OFFO for automated, real-time risk scoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@offolab.com?subject=API Integration Request"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Integration Help
            </a>
            <Link
              href="/pilot"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              Join Pilot Program
            </Link>
          </div>
        </section>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/OFFO_LAB_logo.png"
                alt="OFFO LAB"
                className="h-8 w-auto opacity-60"
              />
              <p className="text-xs text-gray-600">
                © 2025 <span className="font-semibold">OFFO LAB</span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600 font-medium">
                Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Risk Intelligence Engine · v1.0
              </p>
              <p className="text-xs text-red-600 font-semibold mt-1">
                Confidential
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
