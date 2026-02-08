const Profile = require('../models/Profile');

// @desc    Create profile
// @route   POST /api/profile
const createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT to update.' });
    }

    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get profile
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile._id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await Profile.findByIdAndDelete(profile._id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects with optional skill filter
// @route   GET /api/projects?skill=python
const getProjects = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    let projects = profile.projects;

    // Filter by skill if provided
    if (req.query.skill) {
      const skillLower = req.query.skill.toLowerCase();
      projects = projects.filter(project => 
        project.technologies && 
        project.technologies.some(tech => tech.toLowerCase().includes(skillLower))
      );
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top skills
// @route   GET /api/skills/top
const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Return all skills with count
    const skillsWithCount = profile.skills.map(skill => ({
      skill,
      count: 1 // In a real app, this would count project usage
    }));

    res.json(skillsWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Global search
// @route   GET /api/search?q=keyword
const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const searchLower = q.toLowerCase();
    const results = {
      profile: null,
      projects: [],
      skills: [],
      work: []
    };

    // Search in name and email
    if (profile.name.toLowerCase().includes(searchLower) || 
        profile.email.toLowerCase().includes(searchLower)) {
      results.profile = {
        name: profile.name,
        email: profile.email
      };
    }

    // Search in projects
    results.projects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      (project.technologies && project.technologies.some(tech => 
        tech.toLowerCase().includes(searchLower)
      ))
    );

    // Search in skills
    results.skills = profile.skills.filter(skill =>
      skill.toLowerCase().includes(searchLower)
    );

    // Search in work experience
    results.work = profile.work.filter(job =>
      job.company.toLowerCase().includes(searchLower) ||
      job.position.toLowerCase().includes(searchLower) ||
      (job.description && job.description.toLowerCase().includes(searchLower)) ||
      (job.technologies && job.technologies.some(tech => 
        tech.toLowerCase().includes(searchLower)
      ))
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Health check
// @route   GET /health
const healthCheck = (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getProjects,
  getTopSkills,
  searchProfile,
  healthCheck
};
