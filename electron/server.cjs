const express = require('express');
const path = require('path');
const app = express();
const port = 5173;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server; 