const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/auth');
const MongoDBURI = 'mongodb://127.0.0.1:27017/erosion';
const bodyParser = require('body-parser');
const User = require('./models/users');
const postRoutes = require('./routes/posts');
const app = express();
mongoose.connect(MongoDBURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(connect => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log('Connection failed');
  })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/documents',express.static(path.join(__dirname, 'documents')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, AdminAuthorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})
app.use(postRoutes);
app.use(authRouter);
module.exports = app;
