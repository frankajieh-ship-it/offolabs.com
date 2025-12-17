// Municipal API Integration Service
// Integrations for major US cities: San Francisco, Chicago, Los Angeles, Houston, New York

import axios from 'axios';

/**
 * San Francisco Department of Public Health
 * https://data.sfgov.org/
 */
export const sfHealthDept = {
  async getPermit(permitNumber) {
    try {
      const response = await axios.get('https://data.sfgov.org/resource/nc68-ngbr.json', {
        params: {
          permit_number: permitNumber,
          '$$app_token': process.env.SF_GOV_API_KEY
        }
      });
      return response.data[0];
    } catch (error) {
      console.error('SF Health Dept API Error:', error.message);
      return null;
    }
  },

  async checkPermitStatus(businessName) {
    try {
      const response = await axios.get('https://data.sfgov.org/resource/nc68-ngbr.json', {
        params: {
          business_name: businessName,
          '$$app_token': process.env.SF_GOV_API_KEY,
          $limit: 10
        }
      });
      return response.data;
    } catch (error) {
      console.error('SF Health Dept API Error:', error.message);
      return [];
    }
  }
};

/**
 * Chicago Business Affairs & Consumer Protection
 * https://data.cityofchicago.org/
 */
export const chicagoBusinessLicenses = {
  async getBusinessLicense(licenseNumber) {
    try {
      const response = await axios.get('https://data.cityofchicago.org/resource/r5kz-chrr.json', {
        params: {
          license_number: licenseNumber,
          '$$app_token': process.env.CHICAGO_API_KEY
        }
      });
      return response.data[0];
    } catch (error) {
      console.error('Chicago Business License API Error:', error.message);
      return null;
    }
  },

  async searchByBusinessName(businessName) {
    try {
      const response = await axios.get('https://data.cityofchicago.org/resource/r5kz-chrr.json', {
        params: {
          doing_business_as_name: businessName,
          '$$app_token': process.env.CHICAGO_API_KEY,
          $limit: 10
        }
      });
      return response.data;
    } catch (error) {
      console.error('Chicago Business License API Error:', error.message);
      return [];
    }
  },

  async getInspections(licenseNumber) {
    try {
      const response = await axios.get('https://data.cityofchicago.org/resource/4ijn-s7e5.json', {
        params: {
          license_: licenseNumber,
          '$$app_token': process.env.CHICAGO_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Chicago Inspections API Error:', error.message);
      return [];
    }
  }
};

/**
 * Los Angeles Public Health - Food Facilities
 * http://publichealth.lacounty.gov/eh/
 */
export const laHealthDept = {
  async getFacilityInspections(facilityId) {
    // LA County uses their own portal
    // This is a placeholder - actual API may require authentication
    try {
      const response = await axios.get(`${process.env.LA_HEALTH_API_URL}/facilities/${facilityId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.LA_HEALTH_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('LA Health Dept API Error:', error.message);
      return null;
    }
  },

  async searchFacility(businessName, zipCode) {
    try {
      const response = await axios.get(`${process.env.LA_HEALTH_API_URL}/search`, {
        params: {
          name: businessName,
          zip: zipCode
        },
        headers: {
          'Authorization': `Bearer ${process.env.LA_HEALTH_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('LA Health Dept API Error:', error.message);
      return [];
    }
  }
};

/**
 * Houston Permits & Inspections
 * https://cohgis-mycity.opendata.arcgis.com/
 */
export const houstonPermits = {
  async getPermit(permitNumber) {
    try {
      const response = await axios.get('https://services.arcgis.com/su8ic9KbA7PYVxPS/arcgis/rest/services/', {
        params: {
          where: `PERMIT_NBR='${permitNumber}'`,
          outFields: '*',
          f: 'json',
          token: process.env.HOUSTON_API_KEY
        }
      });
      return response.data.features[0];
    } catch (error) {
      console.error('Houston Permits API Error:', error.message);
      return null;
    }
  },

  async getInspectionsByAddress(address) {
    try {
      const response = await axios.get('https://services.arcgis.com/su8ic9KbA7PYVxPS/arcgis/rest/services/', {
        params: {
          where: `ADDRESS LIKE '%${address}%'`,
          outFields: '*',
          f: 'json',
          token: process.env.HOUSTON_API_KEY
        }
      });
      return response.data.features;
    } catch (error) {
      console.error('Houston Inspections API Error:', error.message);
      return [];
    }
  }
};

/**
 * New York City Department of Health
 * https://data.cityofnewyork.us/
 */
export const nycHealthDept = {
  async getRestaurantInspections(camis) {
    try {
      const response = await axios.get('https://data.cityofnewyork.us/resource/43nn-pn8j.json', {
        params: {
          camis: camis,
          '$$app_token': process.env.NYC_API_KEY,
          $limit: 10
        }
      });
      return response.data;
    } catch (error) {
      console.error('NYC Health Dept API Error:', error.message);
      return [];
    }
  },

  async searchByBusinessName(dba) {
    try {
      const response = await axios.get('https://data.cityofnewyork.us/resource/43nn-pn8j.json', {
        params: {
          dba: dba,
          '$$app_token': process.env.NYC_API_KEY,
          $limit: 10
        }
      });
      return response.data;
    } catch (error) {
      console.error('NYC Health Dept API Error:', error.message);
      return [];
    }
  },

  async getLatestGrade(camis) {
    try {
      const response = await axios.get('https://data.cityofnewyork.us/resource/43nn-pn8j.json', {
        params: {
          camis: camis,
          '$$app_token': process.env.NYC_API_KEY,
          $order: 'inspection_date DESC',
          $limit: 1
        }
      });
      return response.data[0];
    } catch (error) {
      console.error('NYC Health Dept API Error:', error.message);
      return null;
    }
  }
};

/**
 * Generic Municipal API Wrapper
 * Automatically selects the appropriate API based on location
 */
export const municipalAPI = {
  async getPermitStatus(location, permitNumber) {
    const city = location.city?.toLowerCase();
    const state = location.state?.toUpperCase();

    try {
      // Route to appropriate city API
      if (city?.includes('san francisco') || city?.includes('sf')) {
        return await sfHealthDept.getPermit(permitNumber);
      } else if (city?.includes('chicago')) {
        return await chicagoBusinessLicenses.getBusinessLicense(permitNumber);
      } else if (city?.includes('los angeles') || city?.includes('la')) {
        return await laHealthDept.getFacilityInspections(permitNumber);
      } else if (city?.includes('houston')) {
        return await houstonPermits.getPermit(permitNumber);
      } else if (city?.includes('new york') || city?.includes('nyc')) {
        return await nycHealthDept.getLatestGrade(permitNumber);
      }

      return { error: 'City not supported yet', city, state };
    } catch (error) {
      console.error('Municipal API Error:', error.message);
      return { error: error.message };
    }
  },

  async searchBusinessPermits(location, businessName) {
    const city = location.city?.toLowerCase();

    try {
      if (city?.includes('san francisco')) {
        return await sfHealthDept.checkPermitStatus(businessName);
      } else if (city?.includes('chicago')) {
        return await chicagoBusinessLicenses.searchByBusinessName(businessName);
      } else if (city?.includes('new york')) {
        return await nycHealthDept.searchByBusinessName(businessName);
      }

      return { error: 'City not supported yet' };
    } catch (error) {
      console.error('Municipal API Error:', error.message);
      return { error: error.message };
    }
  },

  // Get list of supported cities
  getSupportedCities() {
    return [
      { name: 'San Francisco', state: 'CA', features: ['health', 'permits'] },
      { name: 'Chicago', state: 'IL', features: ['business_licenses', 'inspections'] },
      { name: 'Los Angeles', state: 'CA', features: ['health', 'food_facilities'] },
      { name: 'Houston', state: 'TX', features: ['permits', 'inspections'] },
      { name: 'New York', state: 'NY', features: ['health', 'restaurant_grades'] }
    ];
  }
};

export default municipalAPI;
