'use client';

// src/components/DocumentUpload.tsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  projectId: string;
  permitId?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ projectId, permitId }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress?: number;
    url?: string;
    error?: string;
  }>>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    onDrop: (acceptedFiles) => {
      handleFiles(acceptedFiles);
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: string }) => {
      if (permitId) {
        return api.uploadDocument(permitId, file);
      }
      // Project document upload would go here
      return Promise.resolve({ success: true, url: URL.createObjectURL(file) });
    },
    onSuccess: (data, variables) => {
      const fileIndex = uploadedFiles.findIndex(f => f.file === variables.file);
      if (fileIndex !== -1) {
        const newFiles = [...uploadedFiles];
        const responseData = 'data' in data ? data.data : data;
        newFiles[fileIndex] = {
          ...newFiles[fileIndex],
          status: 'success',
          progress: 100,
          url: responseData?.url || ''
        };
        setUploadedFiles(newFiles);
      }
      toast.success('Document uploaded successfully');
    },
    onError: (error: any, variables) => {
      const fileIndex = uploadedFiles.findIndex(f => f.file === variables.file);
      if (fileIndex !== -1) {
        const newFiles = [...uploadedFiles];
        newFiles[fileIndex] = {
          ...newFiles[fileIndex],
          status: 'error',
          error: error.message || 'Upload failed'
        };
        setUploadedFiles(newFiles);
      }
      toast.error('Document upload failed');
    }
  });

  const handleFiles = async (files: File[]) => {
    const newUploads = files.map(file => ({
      file,
      status: 'pending' as const
    }));
    setUploadedFiles(prev => [...prev, ...newUploads]);

    // Upload files sequentially
    for (const upload of newUploads) {
      await uploadFile(upload.file);
    }
  };

  const uploadFile = async (file: File) => {
    const fileIndex = uploadedFiles.findIndex(f => f.file === file);
    if (fileIndex === -1) return;

    // Update status to uploading
    const newFiles = [...uploadedFiles];
    newFiles[fileIndex] = {
      ...newFiles[fileIndex],
      status: 'uploading',
      progress: 0
    };
    setUploadedFiles(newFiles);

    // Simulate progress for demo
    const isDemoMode = !process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

    if (isDemoMode) {
      const interval = setInterval(() => {
        setUploadedFiles(prev => {
          const updated = [...prev];
          const index = updated.findIndex(f => f.file === file);
          if (index !== -1) {
            const currentProgress = updated[index].progress || 0;
            if (currentProgress < 90) {
              updated[index].progress = currentProgress + 10;
            }
          }
          return updated;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => {
          const updated = [...prev];
          const index = updated.findIndex(f => f.file === file);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              status: 'success',
              progress: 100,
              url: URL.createObjectURL(file)
            };
          }
          return updated;
        });
        toast.success(`${file.name} uploaded successfully`);
      }, 1000);

      return;
    }

    // Real upload
    try {
      await uploadMutation.mutateAsync({
        file,
        type: file.type
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('sheet')) return '📊';
    return '📁';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
        <p className="text-sm text-gray-600">
          Upload permits, plans, certificates, and other required documents.
          Files are automatically categorized and linked to relevant permits.
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">
            {isDragActive ? 'Drop files here' : 'Drag & drop files or click to browse'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Upload PDF, images, Word, Excel files (max 10MB each)
          </p>
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Browse Files
        </button>
      </div>

      {/* Upload Progress */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Upload Progress</h4>
          <div className="space-y-3">
            {uploadedFiles.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {getFileIcon(upload.file.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate max-w-xs">
                        {upload.file.name}
                      </span>
                      {upload.status === 'success' && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                      {upload.status === 'error' && (
                        <AlertCircle size={16} className="text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${upload.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {upload.status === 'uploading' ? `${upload.progress}%` : upload.status}
                      </span>
                    </div>
                    {upload.error && (
                      <p className="text-xs text-red-600 mt-1">{upload.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {upload.url && (
                    <a
                      href={upload.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FileText size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-medium text-gray-900 mb-4">Required Documents by Category</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { category: 'Permit Applications', required: 5, completed: 2 },
            { category: 'Architectural Plans', required: 3, completed: 1 },
            { category: 'Health & Safety', required: 4, completed: 1 },
            { category: 'Fire Safety', required: 3, completed: 0 },
            { category: 'Environmental', required: 2, completed: 1 },
            { category: 'Business Licenses', required: 3, completed: 2 },
          ].map((cat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{cat.category}</span>
                <span className="text-sm text-gray-500">
                  {cat.completed}/{cat.required}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(cat.completed / cat.required) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {cat.required - cat.completed} documents remaining
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
