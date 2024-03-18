const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(express.static(path.join(__dirname, '../front-end/dist'), { index: 'index.html' }));
//middleware
app.get('/isAdmin', (req, res) => {
  const { uid } = req.query;

  if (uid === process.env.ADMIN_1 || uid === process.env.ADMIN_2) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'), (err) => {
    if (err) {
      console.log('express routing error: ' + err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});