import React from 'react';
import './App.css';
import QueryForm from './QueryForm';
import { Container, Typography, CssBaseline, Paper } from '@mui/material';

function App() {
  return (
    <div className="App">
      <CssBaseline /> {/* Global styling reset */}
      <Container maxWidth="sm">
        <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Financial Data & Query App
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ marginBottom: 4 }}>
            Ask a financial question and get the answer based on real-time data.
          </Typography>
          <QueryForm />
        </Paper>
      </Container>
    </div>
  );
}

export default App;
