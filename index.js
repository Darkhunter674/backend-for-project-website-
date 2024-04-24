const express = require('express');
var server = express();
var routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
mongoose.connect("mongodb+srv://anubhavchaudhary674:darkhunter@darkhunter.4fxr4nn.mongodb.net/webtech", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  retryWrites: true // Add retryWrites option
})
.then(() => {
  console.log('Connected to MongoDB');
  // Additional code here if needed
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
server.use(express.static('frontend'));

server.use((req, res, next) => {
  const allowedOrigins = ['https://webtech-project-site-by-anubhav-chaudhary.onrender.com']; // Add more origins if needed
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});

server.use(express.static('frontend'));
server.use(cookieParser());
server.use(express.json());
server.use(routes);

server.listen(8000,function check(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("startedddddd")
    }
});