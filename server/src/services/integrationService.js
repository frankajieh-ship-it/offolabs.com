// server/src/services/integrationService.js
import axios from 'axios';
import Permit from '../models/Permit.js';
import Inspection from '../models/Inspection.js';

/**
 * Municipal API Integration Service
 * Handles communication with government permit tracking systems
 */

class MunicipalAPIService {
  constructor() {
    this.baseURLs = {
      health: process.env.HEALTH_DEPT_API_URL || 'https://api.health.gov/permits',
      fire: process.env.FIRE_DEPT_API_URL || 'https://api.fire.gov/permits',
      building: process.env.BUILDING_DEPT_API_URL || 'https://api.building.gov/permits',
      zoning: process.env.ZONING_DEPT_API_URL || 'https://api.zoning.gov/permits'
    };

    this.apiKeys = {
      health: process.env.HEALTH_DEPT_API_KEY,
      fire: process.env.FIRE_DEPT_API_KEY,
      building: process.env.BUILDING_DEPT_API_KEY,
      zoning: process.env.ZONING_DEPT_API_KEY
    };
  }

  /**
   * Get API configuration for a specific permit type
   */
  getAPIConfig(permitType) {
    const baseURL = this.baseURLs[permitType];
    const apiKey = this.apiKeys[permitType];

    if (!baseURL || !apiKey) {
      throw new Error(`API configuration not found for permit type: ${permitType}`);
    }

    return {
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };
  }

  /**
   * Fetch permit status from government system
   */
  async fetchPermitStatus(permitType, externalId) {
    try {
      const config = this.getAPIConfig(permitType);
      const response = await axios.get(`${config.baseURL}/${externalId}`, {
        headers: config.headers,
        timeout: 10000
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error fetching permit status for ${permitType} (${externalId}):`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Submit permit application to government system
   */
  async submitPermitApplication(permitType, permitData) {
    try {
      const config = this.getAPIConfig(permitType);
      const response = await axios.post(config.baseURL, permitData, {
        headers: config.headers,
        timeout: 15000
      });

      return {
        success: true,
        externalId: response.data.id || response.data.permit_id,
        data: response.data
      };
    } catch (error) {
      console.error(`Error submitting permit application for ${permitType}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Schedule inspection through government system
   */
  async scheduleInspectionExternal(permitType, externalId, inspectionData) {
    try {
      const config = this.getAPIConfig(permitType);
      const response = await axios.post(
        `${config.baseURL}/${externalId}/inspections`,
        inspectionData,
        {
          headers: config.headers,
          timeout: 10000
        }
      );

      return {
        success: true,
        inspectionId: response.data.id || response.data.inspection_id,
        data: response.data
      };
    } catch (error) {
      console.error(`Error scheduling inspection for ${permitType} (${externalId}):`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Upload document to government system
   */
  async uploadDocumentExternal(permitType, externalId, documentData) {
    try {
      const config = this.getAPIConfig(permitType);
      const response = await axios.post(
        `${config.baseURL}/${externalId}/documents`,
        documentData,
        {
          headers: config.headers,
          timeout: 20000
        }
      );

      return {
        success: true,
        documentId: response.data.id || response.data.document_id,
        data: response.data
      };
    } catch (error) {
      console.error(`Error uploading document for ${permitType} (${externalId}):`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Singleton instance
const municipalAPI = new MunicipalAPIService();

/**
 * Sync permit status from government system
 * Called periodically by scheduler or manually triggered
 */
export async function syncPermitStatus(permitId) {
  try {
    const permit = await Permit.findById(permitId);

    if (!permit) {
      throw new Error('Permit not found');
    }

    if (!permit.jurisdiction?.externalId) {
      throw new Error('Permit does not have an external ID');
    }

    const result = await municipalAPI.fetchPermitStatus(
      permit.type,
      permit.jurisdiction.externalId
    );

    if (result.success) {
      // Map government status to our status
      const newStatus = mapGovernmentStatus(result.data.status);

      // Update permit with synced data
      permit.status = newStatus;
      permit.automatedTracking = {
        lastSynced: new Date(),
        syncStatus: 'success',
        externalStatus: result.data.status,
        data: result.data
      };

      // Update timeline if available
      if (result.data.approval_date && !permit.timeline.actualApprovalDate) {
        permit.timeline.actualApprovalDate = new Date(result.data.approval_date);
      }
      if (result.data.expiry_date && !permit.timeline.expiryDate) {
        permit.timeline.expiryDate = new Date(result.data.expiry_date);
      }

      await permit.save();

      console.log(`Successfully synced permit ${permitId} with government system`);
      return { success: true, permit };
    } else {
      // Update sync status with error
      permit.automatedTracking = {
        lastSynced: new Date(),
        syncStatus: 'failed',
        externalStatus: permit.automatedTracking?.externalStatus,
        data: { error: result.error }
      };
      await permit.save();

      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error(`Error syncing permit ${permitId}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Submit permit application to government system
 */
export async function submitPermit(permitId) {
  try {
    const permit = await Permit.findById(permitId).populate('project');

    if (!permit) {
      throw new Error('Permit not found');
    }

    // Prepare permit data for submission
    const permitData = {
      name: permit.name,
      type: permit.type,
      project_name: permit.project.name,
      location: {
        address: permit.project.location.address,
        city: permit.project.location.city,
        state: permit.project.location.state,
        zip: permit.project.location.zipCode
      },
      applicant: {
        // Add applicant information
      }
    };

    const result = await municipalAPI.submitPermitApplication(permit.type, permitData);

    if (result.success) {
      // Update permit with external ID
      permit.jurisdiction.externalId = result.externalId;
      permit.status = 'submitted';
      permit.timeline.submissionDate = new Date();
      permit.automatedTracking = {
        lastSynced: new Date(),
        syncStatus: 'success',
        externalStatus: result.data.status,
        data: result.data
      };

      await permit.save();

      console.log(`Successfully submitted permit ${permitId} to government system`);
      return { success: true, permit, externalId: result.externalId };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error(`Error submitting permit ${permitId}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Schedule inspection through government system
 */
export async function scheduleInspection(inspectionId) {
  try {
    const inspection = await Inspection.findById(inspectionId).populate('permit');

    if (!inspection) {
      throw new Error('Inspection not found');
    }

    const permit = inspection.permit;

    if (!permit.jurisdiction?.externalId) {
      throw new Error('Permit does not have an external ID');
    }

    const inspectionData = {
      type: inspection.type,
      scheduled_date: inspection.scheduledDate,
      location: inspection.location
    };

    const result = await municipalAPI.scheduleInspectionExternal(
      permit.type,
      permit.jurisdiction.externalId,
      inspectionData
    );

    if (result.success) {
      // Update inspection with external ID
      inspection.inspector.externalId = result.inspectionId;

      await inspection.save();

      console.log(`Successfully scheduled inspection ${inspectionId} through government system`);
      return { success: true, inspection };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error(`Error scheduling inspection ${inspectionId}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Map government status to our internal status
 */
function mapGovernmentStatus(governmentStatus) {
  const statusMap = {
    'pending': 'submitted',
    'in_review': 'under_review',
    'under_review': 'under_review',
    'approved': 'approved',
    'rejected': 'rejected',
    'denied': 'rejected',
    'expired': 'expired',
    'renewal_required': 'renewal_required'
  };

  return statusMap[governmentStatus?.toLowerCase()] || 'submitted';
}

/**
 * Sync all active permits (called by scheduler)
 */
export async function syncAllActivePermits() {
  try {
    const permits = await Permit.find({
      'jurisdiction.externalId': { $exists: true, $ne: null },
      status: { $in: ['submitted', 'under_review'] }
    });

    console.log(`Starting sync for ${permits.length} active permits`);

    const results = await Promise.allSettled(
      permits.map(permit => syncPermitStatus(permit._id))
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`Sync completed: ${successful} successful, ${failed} failed`);

    return { total: permits.length, successful, failed };
  } catch (error) {
    console.error('Error syncing all active permits:', error.message);
    return { error: error.message };
  }
}

export { municipalAPI };
