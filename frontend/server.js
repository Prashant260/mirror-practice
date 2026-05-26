const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.use(express.static('public'));
app.use(express.json());

// Frontend routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Proxy endpoint to create a user
app.post('/api/users', async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Frontend healthy' });
});

app.listen(PORT, () => {
  console.log(`Frontend listening on port ${PORT}`);
});
