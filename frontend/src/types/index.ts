// src/types/index.ts
export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'admin' | 'project_manager' | 'inspector' | 'contractor' | 'viewer';
  avatar?: string;
  isActive?: boolean;
  preferences?: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    pushNotifications?: boolean;
  };
}

export interface Project {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  targetDate?: string;
  type?: string;
  status?: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  team?: Array<{
    user: User | string;
    role: string;
    permissions?: string[];
  }>;
  tags?: string[];
  owner?: User | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Permit {
  id?: string;
  _id?: string;
  projectId?: string;
  project?: Project | string;
  name: string;
  type: 'health' | 'fire' | 'building' | 'zoning' | 'environmental' | 'business_license' | 'other';
  status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired' | 'renewal_required';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  jurisdiction?: {
    agency?: string;
    municipality?: string;
    contact?: {
      name?: string;
      email?: string;
      phone?: string;
    };
  };
  timeline?: {
    applicationDate?: string;
    submissionDate?: string;
    estimatedApprovalDate?: string;
    actualApprovalDate?: string;
    expiryDate?: string;
    inspectionDate?: string;
  };
  inspector?: {
    name?: string;
    contact?: string;
    email?: string;
    phone?: string;
  };
  documents?: Array<{
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
    uploadedBy?: User | string;
  }>;
  notes?: string;
  requirements?: string[];
  fees?: {
    amount?: number;
    paid?: boolean;
    paidDate?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Inspection {
  id?: string;
  _id?: string;
  permit?: Permit | string;
  type: string;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'passed' | 'failed' | 'cancelled' | 'rescheduled';
  scheduledDate?: string;
  actualDate?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  inspector?: {
    name?: string;
    contact?: string;
    agency?: string;
  };
  attendees?: Array<{
    user: User | string;
    role: string;
    confirmed?: boolean;
  }>;
  checklist?: Array<{
    item: string;
    status: 'pending' | 'pass' | 'fail' | 'na';
    notes?: string;
    timestamp?: string;
  }>;
  findings?: Array<{
    description: string;
    severity: 'critical' | 'major' | 'minor';
    status: 'open' | 'in_progress' | 'resolved';
    correctiveAction?: string;
    photos?: string[];
  }>;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id?: string;
  _id?: string;
  user?: User | string;
  type: 'system' | 'alert' | 'reminder' | 'update' | 'message';
  title: string;
  content: string;
  channel: 'email' | 'sms' | 'push' | 'in-app';
  status: 'pending' | 'sent' | 'failed' | 'read';
  metadata?: {
    projectId?: string;
    permitId?: string;
    inspectionId?: string;
    link?: string;
    data?: any;
  };
  readAt?: string;
  sentAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
