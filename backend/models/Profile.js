const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
    field: String
  }],
  skills: [{
    type: String,
    trim: true
  }],
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    links: {
      github: String,
      live: String,
      demo: String
    },
    technologies: [String],
    year: String
  }],
  work: [{
    company: String,
    position: String,
    duration: String,
    description: String,
    technologies: [String]
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String
  }
}, {
  timestamps: true
});

// Create indexes for search optimization
profileSchema.index({ skills: 1 });
profileSchema.index({ 'projects.title': 'text', 'projects.description': 'text' });
profileSchema.index({ name: 'text', email: 'text' });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
