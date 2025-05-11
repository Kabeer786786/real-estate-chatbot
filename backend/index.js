const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js backend!');
});

// Sample POST route
app.post('/data', (req, res) => {
  const receivedData = req.body;
  res.json({ message: 'Data received successfully', data: receivedData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
