require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const profileData = require('../data/profile-data.json');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');

    // Clear existing data
    await Profile.deleteMany({});
    console.log('Existing profiles cleared');

    // Insert seed data
    const profile = await Profile.create(profileData);
    console.log('Profile seeded successfully:', profile.name);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
