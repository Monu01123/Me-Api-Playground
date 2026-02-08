import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Chip, CircularProgress, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { searchProfile } from '../services/api';

const SkillSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await searchProfile(query);
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Search
      </Typography>

      {/* Search Form */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Search for skills, projects, or keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Search />}
            disabled={loading || !query.trim()}
          >
            Search
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {results && !loading && (
        <Box>
          {/* Profile Results */}
          {results.profile && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Profile Match
                </Typography>
                <Typography variant="h6">{results.profile.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {results.profile.email}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Skills Results */}
          {results.skills && results.skills.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Matching Skills ({results.skills.length})
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {results.skills.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Projects Results */}
          {results.projects && results.projects.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Matching Projects ({results.projects.length})
                </Typography>
                {results.projects.map((project, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    {project.technologies && project.technologies.length > 0 && (
                      <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                        {project.technologies.map((tech, techIndex) => (
                          <Chip key={techIndex} label={tech} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Work Results */}
          {results.work && results.work.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Matching Work Experience ({results.work.length})
                </Typography>
                {results.work.map((job, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="h6">{job.position}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {job.company} • {job.duration}
                    </Typography>
                    {job.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {job.description}
                      </Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {!results.profile && 
           results.skills.length === 0 && 
           results.projects.length === 0 && 
           results.work.length === 0 && (
            <Alert severity="info">
              No results found for "{query}"
            </Alert>
          )}
        </Box>
      )}
    </Container>
  );
};

export default SkillSearch;
