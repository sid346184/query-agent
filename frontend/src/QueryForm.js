import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Box, Divider } from '@mui/material';

const QueryForm = () => {
  const [response, setResponse] = useState(null);
  const [question, setQuestion] = useState('can you compare msft with tatamotors market cap');
  const [ticker, setTicker] = useState('MSFT');
  const [loading, setLoading] = useState(false);

  // Function to send the request to Flask backend
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Define the payload
      const payload = {
        question: question,
        ticker: ticker,
      };

      // Send POST request to Flask backend
      const res = await axios.post('http://127.0.0.1:5000/api/answer', payload);

      // Set the response
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error sending request:', error);
      setResponse('Error: Could not get an answer');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Ask a Financial Question</Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Question"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 }, // Rounded corners for the input field
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Ticker"
          fullWidth
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 }, // Rounded corners for the input field
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={loading}
        sx={{
          mb: 2,
          borderRadius: 2,
          '&:hover': { backgroundColor: '#1976d2' }, // Blue hover effect
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Answer'}
      </Button>

      {response && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6">Response:</Typography>
          <Typography sx={{ padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
            {response}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default QueryForm;
