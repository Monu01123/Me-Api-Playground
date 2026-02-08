import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Link, CircularProgress, Alert } from '@mui/material';
import { Email, GitHub, LinkedIn, Language } from '@mui/icons-material';
import { getProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profile) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {profile.name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Email fontSize="small" />
            <Typography variant="body1">{profile.email}</Typography>
          </Box>
          
          {/* Social Links */}
          <Box display="flex" gap={2} flexWrap="wrap">
            {profile.links?.github && (
              <Link href={profile.links.github} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <GitHub fontSize="small" />
                GitHub
              </Link>
            )}
            {profile.links?.linkedin && (
              <Link href={profile.links.linkedin} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkedIn fontSize="small" />
                LinkedIn
              </Link>
            )}
            {profile.links?.portfolio && (
              <Link href={profile.links.portfolio} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Language fontSize="small" />
                Portfolio
              </Link>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Education
            </Typography>
            {profile.education.map((edu, index) => (
              <Box key={index} mb={2}>
                <Typography variant="h6">{edu.degree}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {edu.institution} • {edu.field}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.year}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {profile.work && profile.work.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Work Experience
            </Typography>
            {profile.work.map((job, index) => (
              <Box key={index} mb={3}>
                <Typography variant="h6">{job.position}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {job.company} • {job.duration}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {job.description}
                </Typography>
                {job.technologies && job.technologies.length > 0 && (
                  <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                    {job.technologies.map((tech, techIndex) => (
                      <Chip key={techIndex} label={tech} size="small" />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
