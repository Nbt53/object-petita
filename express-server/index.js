const express = require('express');
const helmet = require('helmet');
const path = require('path');
// Supports weights 100-900



const app = express();
const PORT = process.env.PORT || 3000;

// Serve Vite-built files as static
app.use(express.static(path.join(__dirname, '../front-end/dist')));


//app.use(helmet.noSniff());
// Your API routes or additional server logic can go here

app.get('/', (req, res) => {
  // Send the 'index.html' file from the static directory
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});