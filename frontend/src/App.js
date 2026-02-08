import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Profile from './components/Profile';
import Projects from './components/Projects';
import SkillSearch from './components/SkillSearch';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Me-API Playground
              </Typography>
              <Button color="inherit" component={RouterLink} to="/">
                Profile
              </Button>
              <Button color="inherit" component={RouterLink} to="/projects">
                Projects
              </Button>
              <Button color="inherit" component={RouterLink} to="/search">
                Search
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/search" element={<SkillSearch />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
