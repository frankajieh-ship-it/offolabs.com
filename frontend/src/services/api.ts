// src/services/api.ts
import axios from 'axios';
import { Project, Permit, Inspection, User } from '../types';

// Demo data for local storage mode
const demoData = {
  projects: [
    {
      id: '1',
      name: 'Ember & Oak Restaurant',
      description: 'Upscale restaurant in Downtown San Francisco',
      location: {
        address: '123 Market St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105'
      },
      targetDate: '2026-01-29',
      type: 'restaurant',
      status: 'in_progress' as const,
      team: [],
      tags: ['restaurant', 'sf', 'new']
    }
  ],
  permits: [
    {
      id: '1',
      projectId: '1',
      name: 'Health Department Permit',
      type: 'health' as const,
      status: 'under_review' as const,
      priority: 'critical' as const,
      jurisdiction: {
        agency: 'County Health Department',
        municipality: 'San Francisco'
      },
      timeline: {
        applicationDate: '2025-11-01',
        estimatedApprovalDate: '2025-12-25'
      },
      inspector: {
        name: 'Marla Chen',
        contact: 'mchen@sfhealth.org'
      }
    },
    {
      id: '2',
      projectId: '1',
      name: 'Fire Safety Inspection',
      type: 'fire' as const,
      status: 'under_review' as const,
      priority: 'critical' as const,
      timeline: {
        inspectionDate: '2025-12-22'
      },
      inspector: {
        name: 'John Rodriguez',
        contact: 'jrodriguez@sffd.org'
      }
    }
  ]
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Check if we're in demo mode
const isDemoMode = !process.env.NEXT_PUBLIC_API_URL && !process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || process.env.REACT_APP_DEMO_MODE === 'true';

// Local storage helper
const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(`offo_${key}`);
    return data ? JSON.parse(data) : null;
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`offo_${key}`, JSON.stringify(value));
  }
};

// Demo API implementation
const demoAPI = {
  async getProjects(): Promise<Project[]> {
    return storage.get('projects') || demoData.projects;
  },

  async getProject(id: string): Promise<Project> {
    const projects = await this.getProjects();
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return project;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');

    projects[index] = { ...projects[index], ...updates };
    storage.set('projects', projects);
    return projects[index];
  },

  async getPermits(projectId: string): Promise<Permit[]> {
    const permits = storage.get('permits') || demoData.permits;
    return permits.filter((p: Permit) => p.projectId === projectId);
  }
};

// Real API implementation
const realAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
realAPI.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
realAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Unified API service
export const api = {
  // Projects
  getProjects: () => {
    return isDemoMode ? demoAPI.getProjects() : realAPI.get('/projects');
  },

  getProject: (id: string) => {
    return isDemoMode ? demoAPI.getProject(id) : realAPI.get(`/projects/${id}`);
  },

  createProject: (data: Partial<Project>) => {
    return isDemoMode ? Promise.resolve({ ...data, id: Date.now().toString() }) : realAPI.post('/projects', data);
  },

  updateProject: (id: string, data: Partial<Project>) => {
    return isDemoMode ? demoAPI.updateProject(id, data) : realAPI.put(`/projects/${id}`, data);
  },

  // Permits
  getPermits: (projectId: string) => {
    return isDemoMode ? demoAPI.getPermits(projectId) : realAPI.get(`/permits/project/${projectId}`);
  },

  getPermit: (id: string) => {
    return isDemoMode ? Promise.resolve(demoData.permits.find(p => p.id === id)) : realAPI.get(`/permits/${id}`);
  },

  updatePermit: (id: string, data: Partial<Permit>) => {
    return isDemoMode ? Promise.resolve({ id, ...data }) : realAPI.patch(`/permits/${id}`, data);
  },

  // Inspections
  getInspections: (filters?: any) => {
    return isDemoMode ? Promise.resolve([]) : realAPI.get('/inspections', { params: filters });
  },

  scheduleInspection: (data: any) => {
    return isDemoMode ? Promise.resolve({ ...data, id: Date.now().toString() }) : realAPI.post('/inspections', data);
  },

  // Documents
  uploadDocument: (permitId: string, file: File) => {
    const formData = new FormData();
    formData.append('document', file);

    return isDemoMode ?
      Promise.resolve({ success: true, url: URL.createObjectURL(file) }) :
      realAPI.post(`/permits/${permitId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  },

  // Notifications
  getNotifications: () => {
    return isDemoMode ? Promise.resolve([]) : realAPI.get('/notifications');
  },

  markNotificationAsRead: (id: string) => {
    return isDemoMode ? Promise.resolve() : realAPI.patch(`/notifications/${id}/read`);
  },

  // Municipal Integration
  syncPermit: (permitId: string) => {
    return isDemoMode ?
      Promise.resolve({ success: true, updated: new Date().toISOString() }) :
      realAPI.post(`/permits/${permitId}/sync`);
  },

  // Auth (always real API)
  login: (email: string, password: string) => {
    return realAPI.post('/auth/login', { email, password });
  },

  register: (data: any) => {
    return realAPI.post('/auth/register', data);
  },

  getUserProfile: () => {
    return realAPI.get('/auth/me');
  }
};
