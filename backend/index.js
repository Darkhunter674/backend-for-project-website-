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
server.use(cors({// Allow requests from this origin
  credentials: true, // Allow cookies to be sent and received across origins
}));
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