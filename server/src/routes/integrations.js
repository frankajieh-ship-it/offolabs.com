// server/src/routes/integrations.js
import express from 'express';
import { municipalAPI } from '../services/municipalAPIs.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get list of supported cities
router.get('/supported-cities', (req, res) => {
  const cities = municipalAPI.getSupportedCities();
  res.json({
    success: true,
    count: cities.length,
    cities
  });
});

// Sync permit with municipal API
router.post('/sync/:city', auth, async (req, res) => {
  try {
    const { city } = req.params;
    const { permitNumber, location } = req.body;

    if (!permitNumber) {
      return res.status(400).json({
        success: false,
        message: 'Permit number is required'
      });
    }

    // Sync with appropriate city API
    const result = await municipalAPI.getPermitStatus(
      location || { city },
      permitNumber
    );

    res.json({
      success: true,
      city,
      permitNumber,
      data: result
    });
  } catch (error) {
    console.error('Municipal API sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync with municipal API',
      error: error.message
    });
  }
});

// Get permit details from specific city
router.get('/:city/permit/:permitNumber', auth, async (req, res) => {
  try {
    const { city, permitNumber } = req.params;

    const result = await municipalAPI.getPermitStatus(
      { city },
      permitNumber
    );

    res.json({
      success: true,
      city,
      permitNumber,
      data: result
    });
  } catch (error) {
    console.error('Municipal API fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch permit data',
      error: error.message
    });
  }
});

export default router;
