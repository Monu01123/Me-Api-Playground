const express = require('express');
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getProjects,
  getTopSkills,
  searchProfile,
  healthCheck
} = require('../controllers/profile.controller');

// Health check
router.get('/health', healthCheck);

// Profile routes
router.post('/api/profile', createProfile);
router.get('/api/profile', getProfile);
router.put('/api/profile', updateProfile);
router.delete('/api/profile', deleteProfile);

// Query routes
router.get('/api/projects', getProjects);
router.get('/api/skills/top', getTopSkills);
router.get('/api/search', searchProfile);

module.exports = router;
