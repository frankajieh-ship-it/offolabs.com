/**
 * OFFO Launch™ API Client
 * Type-safe API calls for launch and permit operations
 */

import type { Launch, Permit, PermitStatus } from '@/lib/types/launch';

// Base API URL - can be configured for different environments
const API_BASE = '/api';

/**
 * API Response types
 */
interface ApiResponse<T> {
  data?: T;
  error?: string;
  detail?: string;
}

interface LaunchListResponse {
  launches: Launch[];
  stats: {
    total: number;
    active: number;
    completed: number;
    averageReadiness: number;
  };
}

interface LaunchDetailResponse {
  launch: Launch;
  metadata: {
    daysUntilOpen: number;
    isOverdue: boolean;
    permitStats: {
      total: number;
      approved: number;
      pending: number;
      critical: number;
      overdue: number;
    };
  };
}

interface PermitListResponse {
  permits: Permit[];
  metadata: {
    total: number;
    approved: number;
    pending: number;
    critical: number;
  };
}

interface PermitUpdateResponse {
  permit: Permit;
  launch: {
    id: string;
    readinessScore: number;
  };
}

/**
 * Generic API call wrapper with error handling
 */
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || 'API request failed',
        detail: data.detail
      };
    }

    return { data };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Launch API operations
 */
export const launchApi = {
  /**
   * Get all launches with optional filtering
   */
  async list(params?: {
    type?: string;
    status?: 'active' | 'completed' | 'overdue';
  }): Promise<ApiResponse<LaunchListResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.set('type', params.type);
    if (params?.status) queryParams.set('status', params.status);

    const query = queryParams.toString();
    return apiCall<LaunchListResponse>(
      `/launch${query ? `?${query}` : ''}`
    );
  },

  /**
   * Get a single launch by ID
   */
  async get(launchId: string): Promise<ApiResponse<LaunchDetailResponse>> {
    return apiCall<LaunchDetailResponse>(`/launch/${launchId}`);
  },

  /**
   * Create a new launch
   */
  async create(data: {
    name: string;
    location: string;
    address: string;
    type: string;
    targetOpenDate: string;
    permits?: any[];
  }): Promise<ApiResponse<{ launch: Launch }>> {
    return apiCall<{ launch: Launch }>('/launch', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Update a launch
   */
  async update(
    launchId: string,
    data: Partial<Launch>
  ): Promise<ApiResponse<{ launch: Launch }>> {
    return apiCall<{ launch: Launch }>(`/launch/${launchId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  /**
   * Delete a launch
   */
  async delete(launchId: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiCall<{ success: boolean }>(`/launch/${launchId}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Permit API operations
 */
export const permitApi = {
  /**
   * Get all permits for a launch
   */
  async list(launchId: string): Promise<ApiResponse<PermitListResponse>> {
    return apiCall<PermitListResponse>(`/launch/${launchId}/permits`);
  },

  /**
   * Get a single permit
   */
  async get(
    launchId: string,
    permitId: string
  ): Promise<ApiResponse<{ permit: Permit }>> {
    return apiCall<{ permit: Permit }>(
      `/launch/${launchId}/permits/${permitId}`
    );
  },

  /**
   * Create a new permit
   */
  async create(
    launchId: string,
    data: {
      type: string;
      title: string;
      description?: string;
      priority: string;
      estimatedProcessingDays: number;
      agency?: string;
      applicationDeadline?: string;
      inspectionDate?: string;
    }
  ): Promise<ApiResponse<{ permit: Permit }>> {
    return apiCall<{ permit: Permit }>(`/launch/${launchId}/permits`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Update a permit (with status transition validation)
   */
  async update(
    launchId: string,
    permitId: string,
    data: Partial<Permit>
  ): Promise<ApiResponse<PermitUpdateResponse>> {
    return apiCall<PermitUpdateResponse>(
      `/launch/${launchId}/permits/${permitId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    );
  },

  /**
   * Update permit status (convenience method)
   */
  async updateStatus(
    launchId: string,
    permitId: string,
    status: PermitStatus
  ): Promise<ApiResponse<PermitUpdateResponse>> {
    return this.update(launchId, permitId, { status });
  },

  /**
   * Add inspector notes
   */
  async addNote(
    launchId: string,
    permitId: string,
    note: string
  ): Promise<ApiResponse<PermitUpdateResponse>> {
    // First get the current permit to append the note
    const currentPermit = await this.get(launchId, permitId);
    if (currentPermit.error || !currentPermit.data) {
      return { error: 'Failed to fetch current permit' };
    }

    const updatedNotes = [
      ...(currentPermit.data.permit.inspectorNotes || []),
      note
    ];

    return this.update(launchId, permitId, {
      inspectorNotes: updatedNotes
    });
  },

  /**
   * Add corrective action
   */
  async addCorrectiveAction(
    launchId: string,
    permitId: string,
    action: string
  ): Promise<ApiResponse<PermitUpdateResponse>> {
    // First get the current permit to append the action
    const currentPermit = await this.get(launchId, permitId);
    if (currentPermit.error || !currentPermit.data) {
      return { error: 'Failed to fetch current permit' };
    }

    const updatedActions = [
      ...(currentPermit.data.permit.correctiveActions || []),
      action
    ];

    return this.update(launchId, permitId, {
      correctiveActions: updatedActions
    });
  },

  /**
   * Delete a permit
   */
  async delete(
    launchId: string,
    permitId: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    return apiCall<{ success: boolean }>(
      `/launch/${launchId}/permits/${permitId}`,
      {
        method: 'DELETE'
      }
    );
  }
};

/**
 * Valid status transitions (for client-side validation)
 */
export const VALID_STATUS_TRANSITIONS: Record<PermitStatus, PermitStatus[]> = {
  not_started: ['application_submitted'],
  application_submitted: ['scheduled', 'rejected'],
  scheduled: ['inspection_passed', 'inspection_failed', 'not_started'],
  inspection_passed: ['approved', 'scheduled'],
  inspection_failed: ['scheduled', 'rejected'],
  approved: [],
  rejected: ['not_started']
};

/**
 * Check if a status transition is valid (client-side validation)
 */
export function isValidStatusTransition(
  currentStatus: PermitStatus,
  newStatus: PermitStatus
): boolean {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(newStatus);
}

/**
 * Get allowed next statuses for a permit
 */
export function getAllowedNextStatuses(
  currentStatus: PermitStatus
): PermitStatus[] {
  return VALID_STATUS_TRANSITIONS[currentStatus];
}
