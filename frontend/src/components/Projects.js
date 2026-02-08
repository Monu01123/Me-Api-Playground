import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Link, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { GitHub, Language } from '@mui/icons-material';
import { getProjects, getProfile } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await getProfile();
      setAllSkills(response.data.skills || []);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
  };

  const fetchProjects = async (skill = '') => {
    try {
      setLoading(true);
      const response = await getProjects(skill);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (event) => {
    const skill = event.target.value;
    setSelectedSkill(skill);
    fetchProjects(skill);
  };

  if (loading && projects.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Projects
      </Typography>

      {/* Filter by Skill */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Skill</InputLabel>
          <Select
            value={selectedSkill}
            label="Filter by Skill"
            onChange={handleSkillChange}
          >
            <MenuItem value="">All Projects</MenuItem>
            {allSkills.map((skill, index) => (
              <MenuItem key={index} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Alert severity="info">No projects found{selectedSkill ? ` for skill: ${selectedSkill}` : ''}.</Alert>
      ) : (
        <Box>
          {projects.map((project, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.title}
                </Typography>
                
                {project.year && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {project.year}
                  </Typography>
                )}

                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                  {project.description}
                </Typography>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip key={techIndex} label={tech} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                )}

                {/* Links */}
                {project.links && (
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {project.links.github && (
                      <Link href={project.links.github} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <GitHub fontSize="small" />
                        GitHub
                      </Link>
                    )}
                    {project.links.live && (
                      <Link href={project.links.live} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Language fontSize="small" />
                        Live Demo
                      </Link>
                    )}
                    {project.links.demo && (
                      <Link href={project.links.demo} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Language fontSize="small" />
                        Demo
                      </Link>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Projects;
