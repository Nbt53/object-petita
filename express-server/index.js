const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
require('dotenv').config();

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front-end/dist'), { index: 'index.html' }));
//request admin credentials
app.get('/isAdmin', (req, res) => {
  const { uid } = req.query;

  if (uid === process.env.ADMIN_1 || uid === process.env.ADMIN_2) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});
///nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  }
});

app.post('/send-email', (req, res) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'objectpetitaceramics@gmail.com',
        subject:'contact form submission',
        text: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.status(200).send('Email sent: ' + info.response);
        }
    });
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